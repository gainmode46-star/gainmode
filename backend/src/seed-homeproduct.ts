import dotenv from 'dotenv'
import { getPayload } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { Users } from './collections/Users.js'
import { Media } from './collections/Media.js'
import { Products } from './collections/products/index.js'
import { Category } from './collections/category/index.js'
import fs from 'fs'
import path from 'path'

dotenv.config()

const config = buildConfig({
  collections: [Users, Media, Products, Category],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/o2_nutrition',
  }),
})

async function seed() {
  try {
    console.log('Loading homeproduct.json...')
    
    const jsonPath = path.join(process.cwd(), '..', 'TEMPLATE_homeproduct.json')
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    
    console.log('Starting database seeding from homeproduct.json...')
    
    const payload = await getPayload({ config })
    
    for (const product of jsonData.products) {
      try {
        const productData = {
          name: product.name,
          image: product.image,
          images: product.images?.map((url: string) => ({ url })) || [],
          rating: product.rating,
          reviews: product.reviews,
          price: product.price,
          originalPrice: product.originalPrice,
          onSale: product.onSale || false,
          category: product.category,
          categorySlug: product.categorySlug,
          subcategory: product.subcategory,
          subcategorySlug: product.subcategorySlug,
          brand: 'other',
          customBrand: product.brand,
          featured: product.featured || false,
          trending: product.trending || false,
          bestSeller: product.bestSeller || false,
          lovedByExperts: product.lovedByExperts || false,
          description: product.description,
          certifications: product.certifications?.map((cert: string) => ({ name: cert })) || [],
          nutritionInfo: product.nutritionInfo || {},
          ingredients: product.ingredients?.map((ingredient: string) => ({ name: ingredient })) || [],
          variants: product.variants || [],
          subscriptionOptions: {
            available: false,
            discounts: {}
          },
          bundledOffers: []
        }
        
        await payload.create({
          collection: 'products',
          data: productData
        })
        console.log(`✅ Created product: ${product.name}`)
      } catch (error) {
        console.error(`❌ Failed to create product ${product.name}:`, error)
      }
    }
    
    console.log('✅ Database seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()