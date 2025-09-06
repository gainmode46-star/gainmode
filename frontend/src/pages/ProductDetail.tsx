import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpsellOffer from "@/components/UpsellOffer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { Product as ApiProduct, productApi } from "@/services/api";
import {
  Award,
  CheckCircle,
  Heart,
  Leaf,
  RotateCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Type definitions for the new JSON structure
type Product = {
  id: number;
  name: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  onSale?: boolean;
  category?: string;
  categorySlug?: string;
  subcategory?: string;
  subcategorySlug?: string;
  brand?: string;
  featured?: boolean;
  trending?: boolean;
  description?: string;
  benefits?: string[];
  certifications?: string[];
  nutritionInfo?: {
    [key: string]: string | number;
  };
  ingredients?: string[];
  subscriptionOptions?: {
    available: boolean;
    discounts: {
      monthly: number;
      quarterly: number;
      biannual: number;
    };
  };
  bundledOffers?: Array<{
    id: string;
    name: string;
    description: string;
    products: number[];
    originalPrice: number;
    bundlePrice: number;
    savings: number;
  }>;
  variants?: Array<{
    flavor: string;
    weight: string;
    price: number;
  }>;
  upsells?: Array<{
    upsellProduct: Product;
    discountPercentage: number;
    description: string;
    active: boolean;
  }>;
};

type ProductData = {
  categories: Array<{
    id: number;
    name: string;
    slug: string;
    subcategories: Array<{
      name: string;
      slug: string;
      items: string[];
    }>;
  }>;
  products: Product[];
};

// Products will be loaded from API

const ProductDetail: React.FC = () => {
  const { id, slug } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Load product from API by slug or ID
  useEffect(() => {
    const loadProduct = async () => {
      if (!id && !slug) {
        setError("No product identifier provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        let response;
        if (slug) {
          console.log("Loading product with slug:", slug);
          response = await productApi.getProductBySlug(slug);
        } else {
          console.log("Loading product with ID:", id);
          response = await productApi.getProductById(id);
        }
        
        console.log("Product API response:", response);
        if (response.success && response.data) {
          setProduct(response.data);
        } else {
          setError(response.error || "Product not found");
        }
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, slug]);

  // Add state for selected flavor and weight
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(
    undefined
  );
  const [selectedWeight, setSelectedWeight] = useState<string | undefined>(
    undefined
  );
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(
    undefined
  );

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, slug]);

  // Product is loaded from API state

  // Extract unique flavors and weights from variants (array of objects)
  const variantFlavors = Array.from(
    new Set(
      Array.isArray(product?.variants)
        ? product.variants.map((v) => v.flavor)
        : []
    )
  );
  const variantWeights = Array.from(
    new Set(
      Array.isArray(product?.variants)
        ? product.variants.map((v) => v.weight)
        : []
    )
  );

  // Set default selected flavor/weight on mount or when product changes
  useEffect(() => {
    if (variantFlavors.length > 0) setSelectedFlavor(variantFlavors[0]);
    if (variantWeights.length > 0) setSelectedWeight(variantWeights[0]);
  }, [product?.id]);

  // Update price when flavor/weight changes
  useEffect(() => {
    if (Array.isArray(product?.variants)) {
      const match = product.variants.find(
        (v) => v.flavor === selectedFlavor && v.weight === selectedWeight
      );
      setSelectedPrice(match ? match.price : undefined);
    }
  }, [selectedFlavor, selectedWeight, product?.variants]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F9A246] mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-heading font-bold text-2xl mb-4">
          {error || "Product Not Found"}
        </h1>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
    navigate("/checkout");
  };

  const features = [
    { icon: Truck, text: "Free shipping on orders over ₹1500" },
    { icon: Shield, text: "100% authentic products guarantee" },
    { icon: RotateCcw, text: "30-day return policy" },
  ];

  const getCertificationIcon = (cert: string) => {
    const certLower = cert.toLowerCase();
    if (certLower.includes("organic") || certLower.includes("natural"))
      return Leaf;
    if (certLower.includes("gmp") || certLower.includes("iso")) return Award;
    return CheckCircle;
  };

  // Default certifications for products that don't have specific ones
  const defaultCertifications = [
    "GMP Certified",
    "ISO 22000",
    "FSSAI Approved",
    "Quality Assured",
  ];

  // Get certifications - use product's certifications or default ones, but limit to 4
  const displayCertifications = (
    product.certifications && product.certifications.length > 0
      ? product.certifications
      : defaultCertifications
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb */}
        <nav className="mb-3 sm:mb-4">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Link
              to="/"
              className="hover:text-[#F9A245] transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-700 font-medium truncate">
              {product.name}
            </span>
          </div>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8">
          <div className="space-y-4">
            {/* Product Images */}
            <div className="relative">
              <div
                className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm relative cursor-crosshair"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setMousePosition({ x, y });
                }}
              >
                <img
                  src={
                    product.images && product.images[selectedImageIndex]
                      ? typeof product.images[selectedImageIndex] === "string"
                        ? product.images[selectedImageIndex]
                        : product.images[selectedImageIndex].url
                      : product.image
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {isZoomed && (
                  <div
                    className="absolute w-32 h-32 border-2 border-gray-400 bg-white bg-opacity-20 pointer-events-none"
                    style={{
                      left: `${mousePosition.x}%`,
                      top: `${mousePosition.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </div>

              {/* Magnifier Window */}
              {isZoomed && (
                <div className="absolute left-full top-0 ml-4 w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-10">
                  <div
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${
                        product.images && product.images[selectedImageIndex]
                          ? typeof product.images[selectedImageIndex] ===
                            "string"
                            ? product.images[selectedImageIndex]
                            : product.images[selectedImageIndex].url
                          : product.image
                      })`,
                      backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                      backgroundSize: "250%",
                    }}
                  />
                </div>
              )}
            </div>
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-[#F9A245] ring-2 ring-[#F9A245]/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={typeof image === "string" ? image : image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Product Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {product.onSale && (
                    <Badge className="bg-[#F9A246] text-white text-xs">
                      Sale
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge variant="secondary" className="text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm font-medium text-gray-900 ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹
                    {(
                      (selectedPrice || product.price) * quantity
                    ).toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{(product.originalPrice * quantity).toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice && (
                    <Badge className="bg-[#F9A246] text-white text-xs">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>

              {/* Flavor and Weight Selectors */}
              {product.variants &&
                (variantFlavors.length > 0 || variantWeights.length > 0) && (
                  <div className="space-y-4 pt-2">
                    {variantFlavors.length > 0 && (
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-900">
                          Flavor
                        </label>
                        <Select
                          value={selectedFlavor}
                          onValueChange={setSelectedFlavor}
                        >
                          <SelectTrigger className="w-full h-12 border-2 border-gray-200 hover:border-[#F9A245] focus:border-[#F9A245] focus:ring-2 focus:ring-[#F9A245]/20 rounded-lg bg-white">
                            <SelectValue
                              placeholder="Choose flavor"
                              className="text-gray-700"
                            />
                          </SelectTrigger>
                          <SelectContent className="border-2 border-gray-200 rounded-lg shadow-lg">
                            {variantFlavors.map((flavor) => (
                              <SelectItem
                                key={flavor}
                                value={flavor}
                                className="hover:bg-[#F9A245]/10 hover:text-black focus:bg-[#F9A245]/10 focus:text-black cursor-pointer py-3"
                              >
                                {flavor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {variantWeights.length > 0 && (
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-900">
                          Weight
                        </label>
                        <Select
                          value={selectedWeight}
                          onValueChange={setSelectedWeight}
                        >
                          <SelectTrigger className="w-full h-12 border-2 border-gray-200 hover:border-[#F9A245] focus:border-[#F9A245] focus:ring-2 focus:ring-[#F9A245]/20 rounded-lg bg-white">
                            <SelectValue
                              placeholder="Choose weight"
                              className="text-gray-700"
                            />
                          </SelectTrigger>
                          <SelectContent className="border-2 border-gray-200 rounded-lg shadow-lg">
                            {variantWeights.map((weight) => (
                              <SelectItem
                                key={weight}
                                value={weight}
                                className="hover:bg-[#F9A245]/10 hover:text-black focus:bg-[#F9A245]/10 focus:text-black cursor-pointer py-3"
                              >
                                {weight}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 bg-[#F9A245] hover:bg-[#F9A245]/90 text-white py-3 px-6"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-[#F9A245] text-[#F9A245] hover:bg-[#F9A245] hover:text-white py-3 px-6"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toggleWishlist(product.id.toString(), {
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      });
                    }}
                    className={
                      isInWishlist(product.id.toString())
                        ? "bg-red-50 border-red-200 text-red-600"
                        : ""
                    }
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${
                        isInWishlist(product.id.toString())
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                    {isInWishlist(product.id.toString())
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: product.name,
                          text: `Check out ${
                            product.name
                          } - ₹${product.price.toLocaleString()}`,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Product link copied to clipboard!");
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[#F9A245]" />
                      <span className="text-sm text-gray-700">
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {product.description ||
                    "This premium product is carefully crafted to meet the highest quality standards. Experience the perfect blend of taste, nutrition, and wellness in every serving."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {product.ingredients && product.ingredients.length > 0 ? (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Ingredients:
                    </h3>
                    <p className="text-gray-700">
                      {product.ingredients
                        .map((ingredient) =>
                          typeof ingredient === "object"
                            ? ingredient.name
                            : ingredient
                        )
                        .join(", ")}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-700">
                    Made with premium, carefully selected ingredients to ensure
                    quality and effectiveness.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {product.nutritionInfo ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Nutrition Information:
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(product.nutritionInfo).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b border-gray-100"
                          >
                            <span className="text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="font-medium text-gray-900">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700">
                    Detailed nutrition information is available on the product
                    packaging.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Certifications */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Certifications & Quality Assurance
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayCertifications.map((cert, index) => {
              const Icon = getCertificationIcon(cert);
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <Icon className="w-8 h-8 text-[#F9A245] mb-2" />
                  <span className="text-sm font-medium text-gray-900 text-center">
                    {cert}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upsell Offers Section */}
        {(() => {
          console.log("Product upsells debug:", {
            hasUpsells: !!product?.upsells,
            upsellsLength: product?.upsells?.length,
            upsells: product?.upsells,
            productId: product?.id,
            currentPrice: selectedPrice || product?.price,
          });

          return product?.upsells && product.upsells.length > 0 ? (
            <UpsellOffer
              currentProductId={product.id}
              upsells={product.upsells}
              currentProductPrice={selectedPrice || product.price}
            />
          ) : null;
        })()}
      </div>
    </div>
  );
};

export default ProductDetail;
