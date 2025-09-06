# JSON Data Structure Guide for O2 Nutrition

## 📋 Complete JSON Structure Requirements

Your `homeproduct.json` file should have this exact structure:

```json
{
  "categories": [
    // Array of main categories for mega menu
  ],
  "products": [
    // Array of all products for search, bestsellers, and product pages
  ]
}
```

## 🏷️ CATEGORIES Structure (For Mega Menu)

```json
{
  "categories": [
    {
      "id": 1,                           // Unique number for each category
      "name": "SPORTS NUTRITION",        // Display name (UPPERCASE recommended)
      "slug": "sports-nutrition",        // URL-friendly version (lowercase, hyphens)
      "subcategories": [                 // Array of subcategories
        {
          "name": "Proteins",            // Subcategory display name
          "slug": "proteins",            // URL-friendly subcategory slug
          "items": [                     // Array of product types/items
            "Whey Proteins",
            "Plant Proteins",
            "Casein Proteins"
            // Add more items as needed
          ]
        }
        // Add more subcategories
      ]
    }
    // Add more categories
  ]
}
```

## 🛍️ PRODUCTS Structure (For Search & Bestsellers)

```json
{
  "products": [
    {
      // ===== BASIC PRODUCT INFO =====
      "id": 1,                                    // Unique product ID (number)
      "name": "Premium Whey Protein Isolate",     // Product name (required)
      "image": "https://example.com/image.jpg",   // Main product image URL
      "images": [                                 // Array of additional images (optional)
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      
      // ===== PRICING INFO =====
      "price": 4199,                              // Current price (number, no currency symbol)
      "originalPrice": 4999,                      // Original price before discount (optional)
      "onSale": true,                             // Boolean: true if product is on sale
      
      // ===== CATEGORY CLASSIFICATION =====
      "category": "SPORTS NUTRITION",             // Must match category name from categories array
      "categorySlug": "sports-nutrition",         // Must match category slug from categories array
      "subcategory": "Proteins",                  // Must match subcategory name
      "subcategorySlug": "proteins",              // Must match subcategory slug
      
      // ===== BRAND & RATINGS =====
      "brand": "O2 Nutrition",                    // Brand name (required for brand filtering)
      "rating": 4.8,                             // Rating out of 5 (number with decimal)
      "reviews": 234,                            // Number of reviews (number)
      
      // ===== BESTSELLER FLAGS =====
      "featured": true,                          // Boolean: true for featured products
      "trending": true,                          // Boolean: true for trending products
      // NOTE: Products with featured=true, trending=true, or rating>=4.5 appear in bestseller menu
      
      // ===== PRODUCT DESCRIPTION =====
      "description": "High-quality whey protein isolate...", // Product description (required for search)
      
      // ===== INGREDIENTS (For Search) =====
      "ingredients": [                           // Array of ingredients (helps with search)
        "Whey Protein Isolate",
        "Natural Flavors",
        "Lecithin",
        "Stevia Extract"
      ],
      
      // ===== NUTRITION INFO (Optional but recommended) =====
      "nutritionInfo": {
        "servingSize": "30g (1 scoop)",
        "servingsPerContainer": 33,
        "protein": "25g",
        "carbohydrates": "2g",
        "fat": "0.5g",
        "calories": 110
      },
      
      // ===== PRODUCT VARIANTS (Optional) =====
      "variants": [
        {
          "flavor": "Chocolate",
          "weight": "1kg",
          "price": 4199
        },
        {
          "flavor": "Vanilla", 
          "weight": "2kg",
          "price": 7999
        }
      ],
      
      // ===== CERTIFICATIONS (Optional) =====
      "certifications": [
        "GMP Certified",
        "Third-Party Tested",
        "Gluten-Free"
      ]
    }
    // Add more products following the same structure
  ]
}
```

## 🎯 REQUIRED FIELDS for Mega Menu to Work:

### For Categories:
- `id` (number)
- `name` (string)
- `slug` (string)
- `subcategories` (array)

### For Subcategories:
- `name` (string)
- `slug` (string)
- `items` (array of strings)

## 🎯 REQUIRED FIELDS for Products:

### Essential Fields:
- `id` (number)
- `name` (string)
- `price` (number)
- `category` (string - must match category name)
- `categorySlug` (string - must match category slug)
- `subcategory` (string)
- `subcategorySlug` (string)
- `brand` (string)
- `rating` (number)
- `reviews` (number)

### For Search Functionality:
- `description` (string)
- `ingredients` (array)

### For Bestseller Menu:
- `featured` (boolean)
- `trending` (boolean)
- `rating` (number >= 4.5 for auto-bestseller)

## 📝 EXAMPLE: Adding a New Product

```json
{
  "id": 25,
  "name": "Advanced BCAA Formula",
  "image": "https://example.com/bcaa.jpg",
  "price": 2499,
  "originalPrice": 2999,
  "onSale": true,
  "category": "SPORTS NUTRITION",
  "categorySlug": "sports-nutrition", 
  "subcategory": "Pre/Post Workout",
  "subcategorySlug": "pre-post-workout",
  "brand": "O2 Nutrition",
  "rating": 4.6,
  "reviews": 156,
  "featured": true,
  "trending": false,
  "description": "Advanced BCAA formula with 2:1:1 ratio for muscle recovery",
  "ingredients": [
    "L-Leucine",
    "L-Isoleucine", 
    "L-Valine",
    "Natural Flavors"
  ]
}
```

## 📝 EXAMPLE: Adding a New Category

```json
{
  "id": 7,
  "name": "SUPPLEMENTS",
  "slug": "supplements",
  "subcategories": [
    {
      "name": "Vitamins",
      "slug": "vitamins",
      "items": [
        "Vitamin D3",
        "Vitamin B12",
        "Multivitamins"
      ]
    },
    {
      "name": "Minerals",
      "slug": "minerals", 
      "items": [
        "Calcium",
        "Magnesium",
        "Zinc"
      ]
    }
  ]
}
```

## ⚠️ IMPORTANT RULES:

1. **Category Matching**: Product's `category` and `categorySlug` MUST exactly match a category in the categories array
2. **Subcategory Matching**: Product's `subcategory` and `subcategorySlug` MUST exactly match a subcategory
3. **Unique IDs**: Each product and category must have a unique ID
4. **Consistent Naming**: Use consistent naming across categories and products
5. **Boolean Values**: Use `true`/`false` (not "true"/"false" strings)
6. **Number Values**: Prices and ratings should be numbers, not strings

## 🚀 HOW THE SYSTEM USES YOUR DATA:

### Mega Menu:
- Uses `categories` array to build navigation
- Shows `subcategories` and their `items`

### Search:
- Searches through `products` array
- Matches against `name`, `description`, `category`, `subcategory`, `brand`, `ingredients`

### Bestseller Menu:
- Filters products where `featured=true` OR `trending=true` OR `rating>=4.5`
- Groups them by category and subcategory

### Product Pages:
- Uses individual product data for display
- Uses `variants` for different options

## 💡 TIPS:

1. **Start Small**: Add a few products first, test, then add more
2. **Consistent Slugs**: Use lowercase with hyphens for all slugs
3. **High-Quality Images**: Use good product images for better UX
4. **SEO-Friendly**: Use descriptive names and descriptions
5. **Regular Updates**: Keep bestseller flags updated based on actual sales

This structure ensures your mega menu, search, and bestseller features work perfectly!