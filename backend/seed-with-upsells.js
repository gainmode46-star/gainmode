import { MongoClient, ObjectId } from 'mongodb';

// Sample products with upsell relationships
const productsWithUpsells = [
  {
    _id: new ObjectId(),
    name: "Premium Whey Protein Isolate",
    slug: "premium-whey-protein-isolate",
    image: "https://cdn.nutrabay.com/wp-content/uploads/2023/09/NB-AVT-1001-23-01.jpg",
    rating: 4.8,
    reviews: 234,
    price: 4199,
    originalPrice: 4999,
    onSale: true,
    category: "SPORTS NUTRITION",
    subcategory: "Proteins",
    brand: "O2 NUTRITION",
    featured: true,
    trending: true,
    bestSeller: true,
    description: "High-quality whey protein isolate with 25g of pure protein per serving.",
    upsells: [] // Will be populated after all products are created
  },
  {
    _id: new ObjectId(),
    name: "BCAA Energy Drink",
    slug: "bcaa-energy-drink",
    image: "https://cdn.nutrabay.com/wp-content/uploads/2023/12/NB-ATH-1002-01-01.jpg",
    rating: 4.6,
    reviews: 189,
    price: 1899,
    originalPrice: 2299,
    onSale: true,
    category: "SPORTS NUTRITION",
    subcategory: "Amino Acids",
    brand: "O2 NUTRITION",
    featured: true,
    trending: false,
    bestSeller: true,
    description: "Essential amino acids for muscle recovery and energy.",
    upsells: []
  },
  {
    _id: new ObjectId(),
    name: "Pre-Workout Explosive",
    slug: "pre-workout-explosive",
    image: "https://cdn2.nutrabay.com/uploads/variant/images/featured_image-NB-BGM-1066-01-1200x1200.webp",
    rating: 4.7,
    reviews: 156,
    price: 2499,
    category: "SPORTS NUTRITION",
    subcategory: "Pre/Post Workout",
    brand: "O2 NUTRITION",
    featured: false,
    trending: true,
    bestSeller: false,
    description: "Explosive pre-workout formula for maximum energy and pump.",
    upsells: []
  },
  {
    _id: new ObjectId(),
    name: "Creatine Monohydrate",
    slug: "creatine-monohydrate",
    image: "https://cdn2.nutrabay.com/uploads/variant/images/featured_image-NB-NUT-1098-01-1753305036-1500x1500.webp",
    rating: 4.5,
    reviews: 298,
    price: 1299,
    category: "SPORTS NUTRITION",
    subcategory: "Pre/Post Workout",
    brand: "O2 NUTRITION",
    featured: true,
    bestSeller: true,
    trending: false,
    description: "Pure creatine monohydrate for strength and power.",
    upsells: []
  }
];

async function seedProductsWithUpsells() {
  const MONGODB_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/o2_nutrition';
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    const productsCollection = db.collection('products');
    
    // Clear existing products (optional)
    // await productsCollection.deleteMany({});
    // console.log('Cleared existing products');
    
    // Insert products first
    for (const product of productsWithUpsells) {
      await productsCollection.insertOne(product);
      console.log(`✅ Created product: ${product.name}`);
    }
    
    // Now add upsell relationships
    const [protein, bcaa, preworkout, creatine] = productsWithUpsells;
    
    // Protein upsells: BCAA and Creatine
    await productsCollection.updateOne(
      { _id: protein._id },
      {
        $set: {
          upsells: [
            {
              upsellProduct: bcaa._id,
              discountPercentage: 15,
              description: "Perfect recovery combo - Protein + BCAA for maximum muscle growth",
              active: true
            },
            {
              upsellProduct: creatine._id,
              discountPercentage: 20,
              description: "Power stack - Protein + Creatine for strength and muscle building",
              active: true
            }
          ]
        }
      }
    );
    
    // BCAA upsells: Protein and Pre-workout
    await productsCollection.updateOne(
      { _id: bcaa._id },
      {
        $set: {
          upsells: [
            {
              upsellProduct: protein._id,
              discountPercentage: 10,
              description: "Complete recovery - BCAA + Protein for optimal muscle repair",
              active: true
            },
            {
              upsellProduct: preworkout._id,
              discountPercentage: 12,
              description: "Energy & Recovery combo - Pre-workout + BCAA for all-day performance",
              active: true
            }
          ]
        }
      }
    );
    
    // Pre-workout upsells: BCAA and Creatine
    await productsCollection.updateOne(
      { _id: preworkout._id },
      {
        $set: {
          upsells: [
            {
              upsellProduct: bcaa._id,
              discountPercentage: 18,
              description: "Performance stack - Pre-workout + BCAA for sustained energy",
              active: true
            },
            {
              upsellProduct: creatine._id,
              discountPercentage: 25,
              description: "Strength combo - Pre-workout + Creatine for explosive power",
              active: true
            }
          ]
        }
      }
    );
    
    // Creatine upsells: Protein and Pre-workout
    await productsCollection.updateOne(
      { _id: creatine._id },
      {
        $set: {
          upsells: [
            {
              upsellProduct: protein._id,
              discountPercentage: 15,
              description: "Muscle building stack - Creatine + Protein for maximum gains",
              active: true
            },
            {
              upsellProduct: preworkout._id,
              discountPercentage: 20,
              description: "Power combo - Creatine + Pre-workout for intense workouts",
              active: true
            }
          ]
        }
      }
    );
    
    console.log('✅ Successfully added upsell relationships!');
    console.log('🎉 Database seeded with products and upsells!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
  }
}

// Run the seeding function
seedProductsWithUpsells();