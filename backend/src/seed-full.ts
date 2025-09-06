import dotenv from 'dotenv'
import { getPayload } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { Users } from './collections/Users.js'
import { Media } from './collections/Media.js'
import { Products } from './collections/products/index.js'
import { Category } from './collections/category/index.js'

dotenv.config()

const config = buildConfig({
  collections: [Users, Media, Products, Category],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/o2_nutrition',
  }),
})

const fullProductData = [
  {
    name: "Premium Whey Protein Isolate",
    image: "https://o2nutrition.com/cdn/shop/files/2_bf926972-514f-44af-99ab-8482d7b296a4.jpg?v=1753303766&width=578",
    images: [
      { url: "https://o2nutrition.com/cdn/shop/files/2_bf926972-514f-44af-99ab-8482d7b296a4.jpg?v=1753303766&width=578" },
      { url: "https://o2nutrition.com/cdn/shop/files/3_bf926972-514f-44af-99ab-8482d7b296a4.jpg?v=1753303766&width=578" },
      { url: "https://o2nutrition.com/cdn/shop/files/4_bf926972-514f-44af-99ab-8482d7b296a4.jpg?v=1753303766&width=578" }
    ],
    rating: 4.8,
    reviews: 234,
    price: 4199,
    originalPrice: 4999,
    onSale: true,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Proteins",
    subcategorySlug: "proteins",
    brand: "other",
    customBrand: "O2 Nutrition",
    featured: true,
    trending: true,
    description: "High-quality whey protein isolate with 25g of pure protein per serving. Perfect for muscle building and recovery after intense workouts.",
    certifications: [
      { name: "GMP Certified" },
      { name: "Third-Party Tested" },
      { name: "Gluten-Free" },
      { name: "Lactose-Free" }
    ],
    nutritionInfo: {
      servingSize: "30g (1 scoop)",
      servingsPerContainer: 33,
      protein: "25g",
      carbohydrates: "2g",
      fat: "0.5g",
      calories: 110,
      sodium: "50mg",
      calcium: "120mg"
    },
    ingredients: [
      { name: "Whey Protein Isolate" },
      { name: "Natural Flavors" },
      { name: "Lecithin" },
      { name: "Stevia Extract" }
    ],
    subscriptionOptions: {
      available: true,
      discounts: {
        monthly: 10,
        quarterly: 15,
        biannual: 20
      }
    },
    variants: [
      { flavor: "Strawberry", weight: "60 capsules", price: 4199 },
      { flavor: "Chocolate", weight: "60 capsules", price: 4299 },
      { flavor: "Vanilla", weight: "60 capsules", price: 4399 }
    ]
  },
  {
    name: "AVVATAR Whey Protein Concentrate",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 189,
    price: 3299,
    originalPrice: 3899,
    onSale: true,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Proteins",
    subcategorySlug: "proteins",
    brand: "AVVATAR",
    featured: true,
    trending: true,
    description: "Premium whey protein concentrate with 24g protein per serving. Perfect for muscle building and recovery.",
    nutritionInfo: {
      servingSize: "30g",
      servingsPerContainer: 33,
      protein: "24g",
      carbohydrates: "3g",
      fat: "1.5g",
      calories: 120
    },
    ingredients: [
      { name: "Whey Protein Concentrate" },
      { name: "Natural Flavors" },
      { name: "Lecithin" },
      { name: "Stevia" }
    ]
  },
  {
    name: "AVVATAR Mass Gainer",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 156,
    price: 4599,
    originalPrice: 5299,
    onSale: true,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Gainers",
    subcategorySlug: "gainers",
    brand: "AVVATAR",
    featured: true,
    trending: false,
    description: "High-calorie mass gainer with 50g protein and complex carbs for serious muscle building.",
    nutritionInfo: {
      servingSize: "150g",
      servingsPerContainer: 16,
      protein: "50g",
      carbohydrates: "90g",
      fat: "6g",
      calories: 620
    },
    ingredients: [
      { name: "Whey Protein" },
      { name: "Maltodextrin" },
      { name: "Oat Flour" },
      { name: "Natural Flavors" }
    ]
  },
  {
    name: "AVVATAR Pre-Workout Ignite",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 234,
    price: 2899,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Pre/Post Workout",
    subcategorySlug: "pre-post-workout",
    brand: "AVVATAR",
    featured: false,
    trending: true,
    description: "Explosive pre-workout formula with caffeine, citrulline, and beta-alanine for maximum performance.",
    nutritionInfo: {
      servingSize: "12g",
      servingsPerContainer: 25,
      caffeine: "250mg",
      citrulline: "6g",
      betaAlanine: "3g",
      calories: 10
    },
    ingredients: [
      { name: "Citrulline Malate" },
      { name: "Beta-Alanine" },
      { name: "Caffeine" },
      { name: "Taurine" },
      { name: "Natural Flavors" }
    ]
  },
  {
    name: "AVVATAR Creatine Monohydrate",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 267,
    price: 1999,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Pre/Post Workout",
    subcategorySlug: "pre-post-workout",
    brand: "AVVATAR",
    featured: true,
    trending: true,
    description: "Pure micronized creatine monohydrate for increased strength, power, and muscle volume.",
    nutritionInfo: {
      servingSize: "5g",
      servingsPerContainer: 60,
      creatineMonohydrate: "5g",
      calories: 0
    },
    ingredients: [
      { name: "Creatine Monohydrate (Micronized)" }
    ]
  },
  {
    name: "Omega-3 Fish Oil",
    image: "https://o2nutrition.com/cdn/shop/files/2_05497c75-dbd5-4de9-9ab7-f33c933d5707.jpg?v=1753304313&width=578",
    rating: 5,
    reviews: 203,
    price: 1699,
    category: "VITAMINS & SUPPLEMENTS",
    categorySlug: "vitamins-supplements",
    subcategory: "Omega Fatty Acids",
    subcategorySlug: "omega-fatty-acids",
    brand: "other",
    customBrand: "PureHealth",
    featured: true,
    trending: true,
    description: "High-potency omega-3 fish oil capsules with EPA and DHA for heart health, brain function, and joint support.",
    nutritionInfo: {
      servingSize: "2 softgels",
      servingsPerContainer: 60,
      totalOmega3: "1000mg",
      epa: "600mg",
      dha: "400mg",
      calories: 10
    },
    ingredients: [
      { name: "Fish Oil (Anchovy, Sardine, Mackerel)" },
      { name: "Gelatin" },
      { name: "Glycerin" }
    ]
  },
  {
    name: "Ashwagandha Root Extract",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=400&fit=crop",
    rating: 5,
    reviews: 312,
    price: 2099,
    category: "AYURVEDA & HERBS",
    categorySlug: "ayurveda-herbs",
    subcategory: "Vital Herbs",
    subcategorySlug: "vital-herbs",
    brand: "other",
    customBrand: "HerbWise",
    featured: true,
    trending: true,
    description: "Premium ashwagandha root extract to help manage stress, improve energy levels, and support overall wellness.",
    nutritionInfo: {
      servingSize: "2 capsules",
      servingsPerContainer: 30,
      ashwagandhaExtract: "600mg",
      withanolides: "30mg",
      calories: 0
    },
    ingredients: [
      { name: "Ashwagandha Root Extract" },
      { name: "Vegetable Cellulose" },
      { name: "Rice Flour" }
    ]
  },
  {
    name: "Thermogenic Fat Burner Extreme",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 189,
    price: 3299,
    originalPrice: 3999,
    onSale: true,
    category: "SPORTS NUTRITION",
    categorySlug: "sports-nutrition",
    subcategory: "Fat Burners",
    subcategorySlug: "fat-burners",
    brand: "other",
    customBrand: "BurnMax",
    featured: true,
    trending: false,
    description: "Advanced thermogenic formula with green tea extract and caffeine for maximum fat burning.",
    ingredients: [
      { name: "Green Tea Extract" },
      { name: "Caffeine" },
      { name: "L-Carnitine" },
      { name: "Garcinia Cambogia" }
    ]
  }
]

async function seed() {
  try {
    console.log('Starting full database seeding...')
    
    const payload = await getPayload({ config })
    
    for (const product of fullProductData) {
      try {
        await payload.create({
          collection: 'products',
          data: {
            ...product,
            subscriptionOptions: product.subscriptionOptions || {
              available: false,
              discounts: {}
            },
            bundledOffers: []
          }
        })
        console.log(`✅ Created product: ${product.name}`)
      } catch (error) {
        console.error(`❌ Failed to create product ${product.name}:`, error)
      }
    }
    
    console.log('✅ Full database seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()