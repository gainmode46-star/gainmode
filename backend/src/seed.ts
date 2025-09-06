import dotenv from 'dotenv'
import { getPayload } from 'payload'
import config from './payload.config.js'
import { seedHeroBanner } from './seed-hero-banner.js'

// Load environment variables
dotenv.config()

console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET)
console.log('DATABASE_URI:', process.env.DATABASE_URI ? 'Set' : 'Not set')

const sampleProducts = [
  {
    name: "Premium Whey Protein Isolate",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 1250,
    price: 2999,
    originalPrice: 3499,
    onSale: true,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Proteins",
    subcategorySlug: "proteins",
    brand: "OPTIMUM NUTRITION",
    featured: true,
    trending: true,
    description: "High-quality whey protein isolate for muscle building and recovery",
    ingredients: [
      { name: "Whey Protein Isolate" },
      { name: "Natural Flavors" },
      { name: "Lecithin" }
    ],
    nutritionInfo: {
      servingSize: "30g (1 scoop)",
      servingsPerContainer: 33,
      protein: "25g",
      carbohydrates: "2g",
      fat: "0.5g",
      calories: 110
    }
  },
  {
    name: "Mass Gainer Pro",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
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
    description: "High-calorie mass gainer for weight gain and muscle building",
    ingredients: [
      { name: "Whey Protein" },
      { name: "Maltodextrin" },
      { name: "Creatine Monohydrate" }
    ],
    nutritionInfo: {
      servingSize: "75g (3 scoops)",
      servingsPerContainer: 13,
      protein: "20g",
      carbohydrates: "45g",
      fat: "3g",
      calories: 280
    }
  },
  {
    name: "Pre-Workout Energy Booster",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop",
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
    description: "Explosive pre-workout formula for enhanced energy and focus",
    ingredients: [
      { name: "Caffeine" },
      { name: "Beta-Alanine" },
      { name: "Citrulline Malate" }
    ],
    nutritionInfo: {
      servingSize: "10g (1 scoop)",
      servingsPerContainer: 30,
      protein: "0g",
      carbohydrates: "2g",
      fat: "0g",
      calories: 10
    }
  },
  {
    name: "Multivitamin Complex",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 750,
    price: 899,
    category: "VITAMINS & SUPPLEMENTS",
    categorySlug: "vitamins-supplements",
    subcategory: "Multivitamins",
    subcategorySlug: "multivitamins",
    brand: "AVVATAR",
    featured: false,
    trending: false,
    description: "Complete multivitamin and mineral supplement for daily health",
    ingredients: [
      { name: "Vitamin A" },
      { name: "Vitamin C" },
      { name: "Vitamin D3" },
      { name: "B-Complex" }
    ]
  },
  {
    name: "Fat Burner Capsules",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    rating: 4.1,
    reviews: 650,
    price: 1599,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Fat Burners",
    subcategorySlug: "fat-burners",
    brand: "DYMATIZE",
    featured: false,
    trending: true,
    description: "Thermogenic fat burner for weight management and metabolism boost",
    ingredients: [
      { name: "Green Tea Extract" },
      { name: "L-Carnitine" },
      { name: "Garcinia Cambogia" }
    ]
  }
]

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
    
    // Seed hero banner
    await seedHeroBanner(payload)
    
    console.log('✅ Database seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()