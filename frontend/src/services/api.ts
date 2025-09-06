const API_BASE_URL = "http://localhost:3000/api";
const PAYLOAD_API_BASE = "http://localhost:3000/api";

export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  images?: { url: string }[];
  rating?: number;
  reviews?: number;
  price: number;
  originalPrice?: number;
  onSale?: boolean;
  category: string;
  categorySlug?: string;
  subcategory?: string;
  subcategorySlug?: string;
  customCategory?: string;
  customSubcategory?: string;
  brand: string;
  customBrand?: string;
  featured?: boolean;
  trending?: boolean;
  bestSeller?: boolean;
  lovedByExperts?: boolean;
  description?: string;
  certifications?: { name: string }[];
  nutritionInfo?: {
    servingSize?: string;
    servingsPerContainer?: number;
    protein?: string;
    carbohydrates?: string;
    fat?: string;
    calories?: number;
    sodium?: string;
    calcium?: string;
  };
  ingredients?: { name: string }[];
  subscriptionOptions?: {
    available?: boolean;
    discounts?: {
      monthly?: number;
      quarterly?: number;
      biannual?: number;
    };
  };
  variants?: {
    flavor?: string;
    weight?: string;
    price?: number;
  }[];
  bundledOffers?: any[];
  upsells?: Array<{
    upsellProduct: Product;
    discountPercentage: number;
    description: string;
    active: boolean;
  }>;
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination?: {
    page: number;
    totalPages: number;
    totalDocs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  featured?: boolean;
  trending?: boolean;
  bestSeller?: boolean;
  lovedByExperts?: boolean;
  onSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Array<{
    name: string;
    slug: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  pagination?: {
    page: number;
    totalPages: number;
    totalDocs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const productApi = {
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams();

    // Convert filters to Payload query format
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (key === 'search') {
          params.append('where[name][contains]', value.toString());
        } else if (key === 'category') {
          params.append('where[category][equals]', value.toString());
        } else if (key === 'subcategory') {
          params.append('where[subcategory][equals]', value.toString());
        } else if (key === 'brand') {
          params.append('where[brand][equals]', value.toString());
        } else if (key === 'featured') {
          params.append('where[featured][equals]', value.toString());
        } else if (key === 'trending') {
          params.append('where[trending][equals]', value.toString());
        } else if (key === 'bestSeller') {
          params.append('where[bestSeller][equals]', value.toString());
        } else if (key === 'lovedByExperts') {
          params.append('where[lovedByExperts][equals]', value.toString());
        } else if (key === 'onSale') {
          params.append('where[onSale][equals]', value.toString());
        } else if (key === 'minPrice') {
          params.append('where[price][greater_than_equal]', value.toString());
        } else if (key === 'maxPrice') {
          params.append('where[price][less_than_equal]', value.toString());
        } else {
          params.append(key, value.toString());
        }
      }
    });

    // Add depth for relationships
    params.append('depth', '2');

    const url = `${PAYLOAD_API_BASE}/products?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform Payload response to expected format
    return {
      success: true,
      data: data.docs || [],
      pagination: {
        page: data.page || 1,
        totalPages: data.totalPages || 1,
        totalDocs: data.totalDocs || 0,
        hasNextPage: data.hasNextPage || false,
        hasPrevPage: data.hasPrevPage || false,
      },
    };
  },

  async getProductById(
    id: string
  ): Promise<{ success: boolean; data?: Product; error?: string }> {
    try {
      console.log("Fetching product from:", `${PAYLOAD_API_BASE}/products/${id}`);
      const response = await fetch(`${PAYLOAD_API_BASE}/products/${id}?depth=2`);
      console.log("Product fetch response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Product fetch error:", errorText);
        return {
          success: false,
          error: `Failed to fetch product: ${response.status} ${response.statusText}`,
        };
      }

      const data = await response.json();
      console.log("Product fetch data:", data);

      // Payload returns the product directly, not wrapped in a success object
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error("Product fetch network error:", error);
      return {
        success: false,
        error: "Network error while fetching product",
      };
    }
  },

  async getProductBySlug(
    slug: string
  ): Promise<{ success: boolean; data?: Product; error?: string }> {
    try {
      const response = await fetch(`${PAYLOAD_API_BASE}/products?where[slug][equals]=${slug}&depth=2`);
      
      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch product: ${response.status}`,
        };
      }

      const data = await response.json();
      const product = data.docs?.[0];

      if (!product) {
        return {
          success: false,
          error: "Product not found",
        };
      }

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      return {
        success: false,
        error: "Network error while fetching product",
      };
    }
  },

  async searchProducts(
    query: string,
    limit: number = 10
  ): Promise<ProductsResponse> {
    return this.getProducts({ search: query, limit });
  },

  async getSearchSuggestions(
    query: string,
    limit: number = 10
  ): Promise<ProductsResponse> {
    if (!query || query.length < 1) {
      return {
        success: true,
        data: [],
        pagination: {
          page: 1,
          totalPages: 0,
          totalDocs: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }
    return this.getProducts({ search: query, limit });
  },

  async getFeaturedProducts(limit: number = 12): Promise<ProductsResponse> {
    return this.getProducts({ featured: true, limit });
  },

  async getTrendingProducts(limit: number = 12): Promise<ProductsResponse> {
    return this.getProducts({ trending: true, limit });
  },

  async getBestSellerProducts(limit: number = 12): Promise<ProductsResponse> {
    return this.getProducts({ bestSeller: true, limit });
  },

  async getLovedByExpertsProducts(
    limit: number = 12
  ): Promise<ProductsResponse> {
    return this.getProducts({ lovedByExperts: true, limit });
  },

  async getProductsByCategory(
    category: string,
    limit: number = 12
  ): Promise<ProductsResponse> {
    return this.getProducts({ category, limit });
  },

  async getProductsByBrand(
    brand: string,
    limit?: number
  ): Promise<ProductsResponse> {
    return this.getProducts({ brand, limit });
  },

  async getAllProducts(): Promise<ProductsResponse> {
    let allProducts: Product[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.getProducts({ page, limit: 100 });
      if (response.success && response.data) {
        allProducts = [...allProducts, ...response.data];
        hasMore = response.pagination?.hasNextPage || false;
        page++;
      } else {
        hasMore = false;
      }
    }

    return {
      success: true,
      data: allProducts,
      pagination: {
        page: 1,
        totalPages: 1,
        totalDocs: allProducts.length,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  },

  async createProduct(
    productData: Partial<Product>
  ): Promise<{ success: boolean; data?: Product; error?: string }> {
    try {
      const response = await fetch(`${PAYLOAD_API_BASE}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `Failed to create product: ${response.status} ${response.statusText}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: "Network error while creating product",
      };
    }
  },
};

export const categoryApi = {
  async getCategories(): Promise<CategoriesResponse> {
    try {
      const response = await fetch(`${PAYLOAD_API_BASE}/category?where[isActive][equals]=true&sort=displayOrder`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data.docs || [],
        pagination: {
          page: data.page || 1,
          totalPages: data.totalPages || 1,
          totalDocs: data.totalDocs || 0,
          hasNextPage: data.hasNextPage || false,
          hasPrevPage: data.hasPrevPage || false,
        },
      };
    } catch (error) {
      console.error("Categories fetch error:", error);
      return {
        success: false,
        data: [],
        pagination: {
          page: 1,
          totalPages: 0,
          totalDocs: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }
  },

  async getCategoryById(
    id: string
  ): Promise<{ success: boolean; data?: Category; error?: string }> {
    try {
      const response = await fetch(`${PAYLOAD_API_BASE}/category/${id}`);

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch category: ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: "Network error while fetching category",
      };
    }
  },

  async getCategoryBySlug(
    slug: string
  ): Promise<{ success: boolean; data?: Category; error?: string }> {
    try {
      const response = await fetch(`${PAYLOAD_API_BASE}/category?where[slug][equals]=${slug}`);

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch category: ${response.status}`,
        };
      }

      const data = await response.json();
      const category = data.docs?.[0];

      if (!category) {
        return {
          success: false,
          error: "Category not found",
        };
      }

      return {
        success: true,
        data: category,
      };
    } catch (error) {
      return {
        success: false,
        error: "Network error while fetching category",
      };
    }
  },
};

export const brandApi = {
  async getBrands(): Promise<{
    success: boolean;
    data: string[];
    count: number;
  }> {
    try {
      const response = await fetch(`${PAYLOAD_API_BASE}/brands`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract brand names from Payload response
      const brandNames = data.docs?.map((brand: any) => brand.name) || [];
      
      return {
        success: true,
        data: brandNames,
        count: brandNames.length,
      };
    } catch (error) {
      console.error("Brands fetch error:", error);
      return {
        success: false,
        data: [],
        count: 0,
      };
    }
  },
};

export interface SearchSuggestion {
  type: "product" | "brand" | "category";
  value: string;
  count?: number;
}

export interface HeroBanner {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  desktopImage: {
    url: string;
    alt?: string;
  };
  mobileImage?: {
    url: string;
    alt?: string;
  };
  isActive: boolean;
}

export const heroBannerApi = {
  async getAllBanners(): Promise<{
    success: boolean;
    data?: HeroBanner[];
    error?: string;
  }> {
    try {
      const url = `${PAYLOAD_API_BASE}/hero-banner?where[isActive][equals]=true&depth=2`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Hero banners fetch error:", errorText);
        return {
          success: false,
          error: `Failed to fetch hero banners: ${response.status}`,
        };
      }

      const data = await response.json();

      if (data.docs && data.docs.length > 0) {
        // Transform the data to match expected format
        const transformedBanners = data.docs.map((banner: any) => ({
          id: banner.id,
          title: banner.title,
          description: banner.description,
          ctaText: banner.ctaText,
          ctaLink: banner.ctaLink,
          desktopImage: {
            url:
              typeof banner.desktopImage === "object"
                ? banner.desktopImage?.url
                : banner.desktopImage,
            alt:
              typeof banner.desktopImage === "object"
                ? banner.desktopImage?.alt
                : "",
          },
          mobileImage: banner.mobileImage
            ? {
                url:
                  typeof banner.mobileImage === "object"
                    ? banner.mobileImage?.url
                    : banner.mobileImage,
                alt:
                  typeof banner.mobileImage === "object"
                    ? banner.mobileImage?.alt
                    : "",
              }
            : undefined,
          isActive: banner.isActive,
        }));

        return {
          success: true,
          data: transformedBanners,
        };
      }

      return {
        success: false,
        error: "No active hero banners found",
      };
    } catch (error) {
      return {
        success: false,
        error: "Network error while fetching hero banners",
      };
    }
  },
};

// Announcements API
export interface Announcement {
  id: string;
  title: string;
  text: string;
  isActive: boolean;
  backgroundColor: string;
  customBackgroundColor?: string;
  textColor: string;
  customTextColor?: string;
  link?: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export const announcementApi = {
  async getActiveAnnouncements(): Promise<{
    success: boolean;
    data?: Announcement[];
    error?: string;
  }> {
    try {
      const response = await fetch(
        `${PAYLOAD_API_BASE}/announcements?where[isActive][equals]=true&sort=-priority`
      );

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch announcements: ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data.docs || [],
      };
    } catch (error) {
      return {
        success: false,
        error: "Network error while fetching announcements",
      };
    }
  },
};

// Coupons API
export interface Coupon {
  id: string;
  code: string;
  title: string;
  description?: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  discountValue: number;
  minimumOrderValue: number;
  maximumDiscountAmount?: number;
  usageLimit?: number;
  usageCount: number;
  userLimit?: number;
  isActive: boolean;
  startsAt?: string;
  expiresAt?: string;
  firstTimeUserOnly: boolean;
  showOnCart: boolean;
  createdAt: string;
  updatedAt: string;
}

export const couponApi = {
  async getAvailableCoupons(): Promise<{
    success: boolean;
    data?: Coupon[];
    error?: string;
  }> {
    try {
      const response = await fetch(
        `${PAYLOAD_API_BASE}/coupons?where[isActive][equals]=true&where[showOnCart][equals]=true`
      );

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to fetch coupons: ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data.docs || [],
      };
    } catch (error) {
      return {
        success: false,
        error: "Network error while fetching coupons",
      };
    }
  },

  async validateCoupon(
    code: string,
    orderValue: number
  ): Promise<{
    success: boolean;
    data?: Coupon;
    error?: string;
  }> {
    try {
      const response = await fetch(
        `${PAYLOAD_API_BASE}/coupons?where[code][equals]=${code.toUpperCase()}&where[isActive][equals]=true`
      );

      if (!response.ok) {
        return {
          success: false,
          error: "Invalid coupon code",
        };
      }

      const data = await response.json();
      const coupon = data.docs?.[0];

      if (!coupon) {
        return {
          success: false,
          error: "Coupon not found",
        };
      }

      // Check minimum order value
      if (coupon.minimumOrderValue && orderValue < coupon.minimumOrderValue) {
        return {
          success: false,
          error: `Minimum order value of ₹${coupon.minimumOrderValue} required`,
        };
      }

      // Check expiry
      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
        return {
          success: false,
          error: "Coupon has expired",
        };
      }

      // Check usage limit
      if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
        return {
          success: false,
          error: "Coupon usage limit exceeded",
        };
      }

      return {
        success: true,
        data: coupon,
      };
    } catch (error) {
      return {
        success: false,
        error: "Network error while validating coupon",
      };
    }
  },
};

export const searchApi = {
  async getSearchSuggestions(
    query: string
  ): Promise<{ success: boolean; data: SearchSuggestion[] }> {
    if (!query || query.length < 1) {
      return { success: true, data: [] };
    }

    try {
      // Get only product suggestions
      const productsRes = await productApi.searchProducts(query, 10);
      const suggestions: SearchSuggestion[] = [];

      // Show only products in suggestions
      if (productsRes.success) {
        const matchingProducts = productsRes.data
          .slice(0, 10)
          .map((product) => ({
            type: "product" as const,
            value: product.name,
          }));
        suggestions.push(...matchingProducts);
      }

      return { success: true, data: suggestions };
    } catch (error) {
      console.error("Search suggestions error:", error);
      return { success: false, data: [] };
    }
  },
};
