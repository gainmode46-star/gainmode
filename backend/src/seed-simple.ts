import dotenv from 'dotenv'
import { getPayload } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { Users } from './collections/Users.js'
import { Media } from './collections/Media.js'
import { Products } from './collections/products/index.js'
import { Category } from './collections/category/index.js'

// Load environment variables
dotenv.config()

const sampleProducts = [
  {
    name: "Premium Whey Protein Isolate",
    image: "https://via.placeholder.com/300x300",
    rating: 4.5,
    reviews: 1250,
    price: 2999,
    originalPrice: 3499,
    onSale: true,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Proteins",
    subcategorySlug: "proteins",
    brand: "ON (OPTIMUM NUTRITION)",
    featured: true,
    trending: true,
    description: "High-quality whey protein isolate for muscle building and recovery"
  },
  {
    name: "Mass Gainer Pro",
    image: "https://via.placeholder.com/300x300",
    rating: 4.2,
    reviews: 890,
    price: 3499,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Gainers",
    subcategorySlug: "gainers",
    brand: "MUSCLE BLAZE",
    featured: false,
    trending: true,
    description: "High-calorie mass gainer for weight gain and muscle building"
  },
  {
    name: "Pre-Workout Energy Booster",
    image: "https://via.placeholder.com/300x300",
    rating: 4.7,
    reviews: 2100,
    price: 1899,
    originalPrice: 2199,
    onSale: true,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Pre/Post Workout",
    subcategorySlug: "pre-post-workout",
    brand: "GNC",
    featured: true,
    trending: false,
    description: "Explosive pre-workout formula for enhanced energy and focus"
  }
]

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
    console.log('Starting database seeding...')
    
    const payload = await getPayload({ config })
    
    for (const product of sampleProducts) {
      try {
        await payload.create({
          collection: 'products',
          data: product
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