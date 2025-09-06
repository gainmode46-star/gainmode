# Mega Menu Dynamic Setup

## Overview
The mega menu now dynamically loads categories and subcategories from the backend, while keeping your existing static data as fallback. Products can be marked as "Best Sellers" and will appear in the Best Sellers mega menu.

## Backend Changes

### 1. Enhanced Category Collection
- Added better fields for category management
- Auto-generates slugs from names
- Added display order and active status
- Supports descriptions and images for categories/subcategories

### 2. Enhanced Products Collection
- Added `bestSeller` checkbox field
- Added `customCategory` and `customSubcategory` fields
- Products can now be marked as best sellers from the admin panel

### 3. Seeded Categories
- Pre-populated with your existing category structure
- Run `npm run seed-categories-mega` to populate categories

## Frontend Changes

### 1. Dynamic Mega Menu
- Loads categories from API
- Falls back to static data if API fails
- Populates subcategories with actual products
- Shows up to 15 products per subcategory

### 2. Best Sellers Menu
- Filters products marked as `bestSeller`, `featured`, `trending`, or high-rated (4.0+)
- Groups by category and subcategory
- Shows up to 6 items per subcategory

## How to Use

### Adding New Categories (Backend Admin)
1. Go to `/admin/collections/category`
2. Click "Create New"
3. Fill in category name (slug auto-generates)
4. Add subcategories with names (slugs auto-generate)
5. Set display order and active status
6. Save

### Marking Products as Best Sellers
1. Go to `/admin/collections/products`
2. Edit any product
3. Check the "Mark as best seller product" checkbox
4. Save

### Frontend Updates
- Categories and subcategories automatically appear in mega menu
- Products marked as best sellers appear in Best Sellers menu
- Menu updates in real-time when you add/edit categories or products

## API Endpoints
- `GET /api/category` - Get all categories
- `GET /api/products?bestSeller=true` - Get best seller products
- `GET /api/products?category=sports-nutrition` - Get products by category

## Files Modified

### Backend
- `/src/collections/category/index.ts` - Enhanced category collection
- `/src/collections/products/index.ts` - Added bestSeller field
- `/src/seed-categories-mega.ts` - Category seeding script

### Frontend
- `/src/components/Layout/MegaMenu.tsx` - Dynamic category loading
- `/src/data/bestseller_mega.tsx` - Best seller filtering
- `/src/services/api.ts` - Added category API and bestSeller field

## Running the Setup
1. Seed categories: `cd backend && npm run seed-categories-mega`
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm run dev`
4. Access admin at `http://localhost:3000/admin`
5. View frontend at `http://localhost:5173`

The mega menu will now show your categories dynamically while maintaining all existing functionality!