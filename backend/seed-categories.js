const payload = require('payload');

const categories = [
  {
    name: 'SPORTS NUTRITION',
    slug: 'sports-nutrition',
    subcategories: [
      {
        name: 'Proteins',
        slug: 'proteins',
        items: [
          { item: 'Whey Protein Isolate' },
          { item: 'Casein Protein' },
          { item: 'Plant Protein' },
          { item: 'Egg Protein' },
          { item: 'Hydrolyzed Whey' },
          { item: 'Protein Blend' }
        ]
      },
      {
        name: 'Gainers',
        slug: 'gainers',
        items: [
          { item: 'Mass Gainer Pro' },
          { item: 'Weight Gainer Plus' },
          { item: 'Lean Mass Gainer' },
          { item: 'Carb Gainer' },
          { item: 'Muscle Gainer' },
          { item: 'Power Gainer' }
        ]
      },
      {
        name: 'Pre/Post Workout',
        slug: 'pre-post-workout',
        items: [
          { item: 'Pre-Workout Boost' },
          { item: 'Creatine Monohydrate' },
          { item: 'BCAA Energy' },
          { item: 'Post Recovery' },
          { item: 'Nitric Oxide' },
          { item: 'Beta Alanine' }
        ]
      },
      {
        name: 'Fat Burners',
        slug: 'fat-burners',
        items: [
          { item: 'L-Carnitine Liquid' },
          { item: 'Thermogenic Fat Burner' },
          { item: 'CLA Capsules' },
          { item: 'Green Coffee Extract' },
          { item: 'Garcinia Cambogia' },
          { item: 'Fat Metabolizer' }
        ]
      }
    ]
  },
  {
    name: 'VITAMINS & SUPPLEMENTS',
    slug: 'vitamins-supplements',
    subcategories: [
      {
        name: 'Multivitamins',
        slug: 'multivitamins',
        items: [
          { item: 'Men\'s Daily Multi' },
          { item: 'Women\'s Complete' },
          { item: 'Senior Formula' },
          { item: 'Teen Vitamins' },
          { item: 'Prenatal Multi' },
          { item: 'Active Multi' }
        ]
      },
      {
        name: 'Omega Fatty Acids',
        slug: 'omega-fatty-acids',
        items: [
          { item: 'Fish Oil 1000mg' },
          { item: 'Omega-3 Triple' },
          { item: 'Krill Oil Premium' },
          { item: 'Flaxseed Oil' },
          { item: 'Cod Liver Oil' },
          { item: 'Algae Omega-3' }
        ]
      },
      {
        name: 'Skin Supplements',
        slug: 'skin-supplements',
        items: [
          { item: 'Collagen Peptides' },
          { item: 'Biotin Hair Skin' },
          { item: 'Glutathione Glow' },
          { item: 'Vitamin E Beauty' },
          { item: 'Hyaluronic Acid' },
          { item: 'Anti-Aging Complex' }
        ]
      }
    ]
  },
  {
    name: 'AYURVEDA & HERBS',
    slug: 'ayurveda-herbs',
    subcategories: [
      {
        name: 'Herbs for Weight Loss',
        slug: 'herbs-weight-loss',
        items: [
          { item: 'Green Coffee Bean' },
          { item: 'Garcinia Cambogia' },
          { item: 'Green Tea Extract' },
          { item: 'Guggul Capsules' },
          { item: 'Triphala Powder' },
          { item: 'Forskolin Extract' }
        ]
      },
      {
        name: 'Vital Herbs',
        slug: 'vital-herbs',
        items: [
          { item: 'Ashwagandha Root' },
          { item: 'Ginseng Extract' },
          { item: 'Brahmi Capsules' },
          { item: 'Shankhpushpi' },
          { item: 'Ginkgo Biloba' },
          { item: 'Rhodiola Rosea' }
        ]
      },
      {
        name: 'Antioxidants',
        slug: 'antioxidants',
        items: [
          { item: 'Turmeric Curcumin' },
          { item: 'Amla Vitamin C' },
          { item: 'Spirulina Tablets' },
          { item: 'Chlorella Powder' },
          { item: 'Grape Seed Extract' },
          { item: 'Resveratrol' }
        ]
      }
    ]
  },
  {
    name: 'HEALTH FOOD & DRINKS',
    slug: 'health-food-drinks',
    subcategories: [
      {
        name: 'Weight Loss Foods',
        slug: 'weight-loss-foods',
        items: [
          { item: 'Steel Cut Oats' },
          { item: 'Quinoa Organic' },
          { item: 'Chia Seeds' },
          { item: 'Protein Bars' },
          { item: 'Meal Replacement' },
          { item: 'Fiber Powder' }
        ]
      },
      {
        name: 'Health Juices',
        slug: 'health-juices',
        items: [
          { item: 'Apple Cider Vinegar' },
          { item: 'Aloe Vera Juice' },
          { item: 'Amla Juice' },
          { item: 'Karela Jamun' },
          { item: 'Wheatgrass Juice' },
          { item: 'Noni Juice' }
        ]
      }
    ]
  },
  {
    name: 'FITNESS',
    slug: 'fitness',
    subcategories: [
      {
        name: 'Gym Accessories',
        slug: 'gym-accessories',
        items: [
          { item: 'Gym Gloves Pro' },
          { item: 'Resistance Bands' },
          { item: 'Hand Grippers' },
          { item: 'Ab Wheel Roller' },
          { item: 'Push Up Bars' },
          { item: 'Ankle Weights' }
        ]
      },
      {
        name: 'Fitness Trackers',
        slug: 'fitness-trackers',
        items: [
          { item: 'Smart Watch Pro' },
          { item: 'Fitness Band' },
          { item: 'Heart Rate Monitor' },
          { item: 'Step Counter' },
          { item: 'Sleep Tracker' },
          { item: 'Activity Monitor' }
        ]
      }
    ]
  },
  {
    name: 'WELLNESS',
    slug: 'wellness',
    subcategories: [
      {
        name: 'Skin Care',
        slug: 'skin-care',
        items: [
          { item: 'Face Wash Gentle' },
          { item: 'Moisturizer Daily' },
          { item: 'Vitamin C Serum' },
          { item: 'Sunscreen SPF 50' },
          { item: 'Night Cream' },
          { item: 'Face Mask' }
        ]
      },
      {
        name: 'Hair Care',
        slug: 'hair-care',
        items: [
          { item: 'Hair Oil Nourish' },
          { item: 'Anti-Dandruff Shampoo' },
          { item: 'Hair Conditioner' },
          { item: 'Hair Serum' },
          { item: 'Hair Mask' },
          { item: 'Scalp Treatment' }
        ]
      }
    ]
  }
];

async function seedCategories() {
  try {
    console.log('Starting category seeding...');
    
    // Clear existing categories
    await payload.delete({
      collection: 'category',
      where: {}
    });
    
    console.log('Cleared existing categories');
    
    // Insert new categories
    for (const category of categories) {
      const result = await payload.create({
        collection: 'category',
        data: category
      });
      console.log(`Created category: ${result.name}`);
    }
    
    console.log('✅ Categories seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
}

// Initialize Payload and run seeding
require('dotenv').config();
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  local: true,
}).then(() => {
  seedCategories();
});