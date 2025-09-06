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

const categories = [
  {
    name: 'SPORTS NUTRITION',
    slug: 'sports-nutrition',
    description: 'Complete range of sports nutrition supplements for athletes and fitness enthusiasts',
    displayOrder: 1,
    isActive: true,
    subcategories: [

      {
        name: 'Gainers',
        slug: 'gainers',
        description: 'Weight and mass gainers for muscle growth'
      },

      {
        name: 'Workout Essentials',
        slug: 'workout-essentials',
        description: 'Essential supplements for workout support'
      }
    ]
  },
  {
    name: 'VITAMINS & SUPPLEMENTS',
    slug: 'vitamins-supplements',
    description: 'Essential vitamins and supplements for overall health and wellness',
    displayOrder: 2,
    isActive: true,
    subcategories: [
      {
        name: 'Omega Fatty Acids',
        slug: 'omega-fatty-acids',
        description: 'Essential fatty acids for heart and brain health'
      },
      {
        name: 'Multivitamins',
        slug: 'multivitamins',
        description: 'Complete multivitamin formulas for daily nutrition'
      },
      {
        name: 'Skin Supplements',
        slug: 'skin-supplements',
        description: 'Supplements for healthy and glowing skin'
      },
      {
        name: 'Hair Supplements',
        slug: 'hair-supplements',
        description: 'Supplements for strong and healthy hair'
      },
      {
        name: 'Speciality Supplements',
        slug: 'speciality-supplements',
        description: 'Specialized supplements for specific health needs'
      }
    ]
  },
  {
    name: 'AYURVEDA & HERBS',
    slug: 'ayurveda-herbs',
    description: 'Traditional Ayurvedic herbs and natural supplements',
    displayOrder: 3,
    isActive: true,
    subcategories: [
      {
        name: 'Herbs for Weight Loss',
        slug: 'herbs-weight-loss',
        description: 'Natural herbs for healthy weight management'
      },
      {
        name: 'Vital Herbs',
        slug: 'vital-herbs',
        description: 'Essential herbs for overall vitality and wellness'
      },
      {
        name: 'Antioxidants',
        slug: 'antioxidants',
        description: 'Natural antioxidants for cellular protection'
      },
      {
        name: 'Herbs for Immunity',
        slug: 'herbs-immunity',
        description: 'Immune-boosting herbs and formulations'
      },
      {
        name: 'Herbs for Personal Care',
        slug: 'herbs-personal-care',
        description: 'Herbs for personal health and wellness'
      },
      {
        name: 'Herbal Extracts',
        slug: 'herbal-extracts',
        description: 'Concentrated herbal extracts and formulations'
      },
      {
        name: 'Herbs for Digestive Care',
        slug: 'herbs-digestive-care',
        description: 'Digestive health supporting herbs'
      },
      {
        name: 'Herbs for Hair Care',
        slug: 'herbs-hair-care',
        description: 'Natural herbs for hair health and growth'
      },
      {
        name: 'Herbal Oils',
        slug: 'herbal-oils',
        description: 'Pure and natural herbal oils'
      },
      {
        name: 'Herbs for Diabetic Care',
        slug: 'herbs-diabetic-care',
        description: 'Herbs supporting diabetic health management'
      }
    ]
  },
  {
    name: 'HEALTH FOOD & DRINKS',
    slug: 'health-food-drinks',
    description: 'Healthy food products and nutritious beverages',
    displayOrder: 4,
    isActive: true,
    subcategories: [
      {
        name: 'Weight Loss Foods',
        slug: 'weight-loss-foods',
        description: 'Healthy foods supporting weight management'
      },
      {
        name: 'Vinegar and Health Juices',
        slug: 'vinegar-health-juices',
        description: 'Natural vinegars and health-promoting juices'
      },
      {
        name: 'Protein Foods & Bars',
        slug: 'protein-foods-bars',
        description: 'Protein-rich foods and convenient bars'
      },
      {
        name: 'Protein Bars',
        slug: 'protein-bars',
        description: 'High-protein bars and snacks'
      },
      {
        name: 'Protein for Wellness',
        slug: 'protein-wellness',
        description: 'Wellness-focused protein products'
      },
      {
        name: 'Family Nutrition',
        slug: 'family-nutrition',
        description: 'Nutritional products for the whole family'
      },
      {
        name: 'Healthy Beverages',
        slug: 'healthy-beverages',
        description: 'Nutritious and healthy drink options'
      }
    ]
  },
  {
    name: 'FITNESS',
    slug: 'fitness',
    description: 'Fitness equipment and accessories for your workout needs',
    displayOrder: 5,
    isActive: true,
    subcategories: [
      {
        name: 'Gym Accessories',
        slug: 'gym-accessories',
        description: 'Essential gym accessories and equipment'
      },
      {
        name: 'Fitness Trackers',
        slug: 'fitness-trackers',
        description: 'Technology for tracking your fitness progress'
      },
      {
        name: 'Gym Essentials',
        slug: 'gym-essentials',
        description: 'Must-have items for your gym routine'
      },
      {
        name: 'Fitness Clothing',
        slug: 'fitness-clothing',
        description: 'Comfortable and functional fitness apparel'
      },
      {
        name: 'Gym Supports',
        slug: 'gym-supports',
        description: 'Support gear for safe and effective workouts'
      }
    ]
  },
  {
    name: 'WELLNESS',
    slug: 'wellness',
    description: 'Personal care and wellness products for overall health',
    displayOrder: 6,
    isActive: true,
    subcategories: [
      {
        name: 'Skin Care',
        slug: 'skin-care',
        description: 'Complete skin care solutions and products'
      },
      {
        name: 'Hair Care',
        slug: 'hair-care',
        description: 'Hair care products for healthy and beautiful hair'
      },
      {
        name: 'Personal Care',
        slug: 'personal-care',
        description: 'Personal care essentials and products'
      },
      {
        name: 'Herbs for Skin Care',
        slug: 'herbs-skin-care',
        description: 'Natural herbs for skin health and beauty'
      },
      {
        name: 'Herbs for Hair Growth',
        slug: 'herbs-hair-growth',
        description: 'Natural herbs promoting hair growth and health'
      }
    ]
  }
];

const config = buildConfig({
  collections: [Users, Media, Products, Category],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/o2_nutrition',
  }),
})

async function seedCategories() {
  try {
    console.log('Starting category seeding...');
    
    const payload = await getPayload({ config });
    
    for (const categoryData of categories) {
      try {
        // Check if category already exists
        const existingCategory = await payload.find({
          collection: 'category',
          where: {
            slug: {
              equals: categoryData.slug,
            },
          },
        });

        if (existingCategory.docs.length > 0) {
          console.log(`Category "${categoryData.name}" already exists, updating...`);
          await payload.update({
            collection: 'category',
            id: existingCategory.docs[0].id,
            data: categoryData,
          });
        } else {
          console.log(`Creating category: ${categoryData.name}`);
          await payload.create({
            collection: 'category',
            data: categoryData,
          });
        }
      } catch (error) {
        console.error(`Error processing category ${categoryData.name}:`, error);
      }
    }
    
    console.log('Category seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();