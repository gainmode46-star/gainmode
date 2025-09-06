import { getPayloadClient } from '@/lib/payload'
import { NextRequest, NextResponse } from 'next/server'
import { CollectionSlug } from 'payload'

// GET /api/products/slug/[slug] - Get product by slug
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Product slug is required' },
        { status: 400 },
      )
    }

    const payload = await getPayloadClient()

    // Find product by slug
    const products = await payload.find({
      collection: 'products' as CollectionSlug,
      where: {
        slug: { equals: slug },
      },
      limit: 1,
      depth: 1,
    })

    if (!products.docs || products.docs.length === 0) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }

    const product = products.docs[0]

    // Convert to plain object to avoid serialization issues
    const plainProduct = {
      id: product.id,
      slug: (product as any).slug,
      name: (product as any).name,
      image: (product as any).image,
      images: (product as any).images || [],
      rating: (product as any).rating,
      reviews: (product as any).reviews,
      price: (product as any).price,
      originalPrice: (product as any).originalPrice,
      onSale: (product as any).onSale,
      category: (product as any).category,
      categorySlug: (product as any).categorySlug,
      subcategory: (product as any).subcategory,
      subcategorySlug: (product as any).subcategorySlug,
      brand: (product as any).brand,
      featured: (product as any).featured,
      trending: (product as any).trending,
      description: (product as any).description,
      certifications: (product as any).certifications || [],
      nutritionInfo: (product as any).nutritionInfo,
      ingredients: (product as any).ingredients || [],
      subscriptionOptions: (product as any).subscriptionOptions,
      variants: (product as any).variants || [],
      bundledOffers: (product as any).bundledOffers || [],
      inStock: (product as any).inStock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }

    return NextResponse.json({
      success: true,
      data: plainProduct,
    })
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
