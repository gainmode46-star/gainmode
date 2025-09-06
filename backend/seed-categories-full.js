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
          { item: 'Whey Proteins' },
          { item: 'Beginners Whey Protein' },
          { item: 'Whey Protein Isolate' },
          { item: 'Raw Whey Proteins' },
          { item: 'Plant Proteins' },
          { item: 'Protein for Women' },
          { item: 'Protein Blends' }
        ]
      },
      {
        name: 'Gainers',
        slug: 'gainers',
        items: [
          { item: 'Weight Gainers' },
          { item: 'Mass Gainers' },
          { item: 'Herbal Weight Gainers' },
          { item: 'Lean Mass Gainer' },
          { item: 'Carb Gainer' },
          { item: 'Muscle Gainer' },
          { item: 'Power Gainer' }
        ]
      },
      {
        name: 'Protein Foods',
        slug: 'protein-foods',
        items: [
          { item: 'Peanut Butter' },
          { item: 'Muesli' },
          { item: 'Protein Shakes' },
          { item: 'Oats' },
          { item: 'Cereals' },
          { item: 'Protein Bars' },
          { item: 'Protein Cookies' }
        ]
      },
      {
        name: 'Pre/Post Workout',
        slug: 'pre-post-workout',
        items: [
          { item: 'Pre-Workout' },
          { item: 'Creatine' },
          { item: 'Beta Alanine' },
          { item: 'BCAAs' },
          { item: 'Carb Blends' },
          { item: 'Electrolytes' },
          { item: 'EAA' }
        ]
      },
      {
        name: 'Workout Essentials',
        slug: 'workout-essentials',
        items: [
          { item: 'Fat Burners' },
          { item: 'L-Carnitine' },
          { item: 'Multivitamins for Bodybuilding' },
          { item: 'Testosterone Booster' },
          { item: 'ZMA' },
          { item: 'Nitric Oxide' },
          { item: 'Citrulline Malate' }
        ]
      }
    ]
  },
  {
    name: 'VITAMINS & SUPPLEMENTS',
    slug: 'vitamins-supplements',
    subcategories: [
      {
        name: 'Omega Fatty Acids',
        slug: 'omega-fatty-acids',
        items: [
          { item: 'Omega 3' },
          { item: 'Fish Oil' },
          { item: 'Flaxseed Oil' },
          { item: 'Cod Liver Oil' },
          { item: 'Krill Oil' },
          { item: 'Algae Omega-3' },
          { item: 'Evening Primrose Oil' }
        ]
      },
      {
        name: 'Multivitamins',
        slug: 'multivitamins',
        items: [
          { item: 'Multivitamins - Men' },
          { item: 'Multivitamins - Women' },
          { item: 'Multivitamins - Children' },
          { item: 'Senior Formula' },
          { item: 'Teen Vitamins' },
          { item: 'Prenatal Multi' },
          { item: 'Active Multi' }
        ]
      },
      {
        name: 'Skin Supplements',
        slug: 'skin-supplements',
        items: [
          { item: 'Collagen' },
          { item: 'Glutathione' },
          { item: 'Cleansers' },
          { item: 'Moisturizer' },
          { item: 'Face Wash' },
          { item: 'Serum' },
          { item: 'Under Eye Care' }
        ]
      },
      {
        name: 'Hair Supplements',
        slug: 'hair-supplements',
        items: [
          { item: 'Hair Regrowth Solution Kits' },
          { item: 'Multivitamins - General' },
          { item: 'DHT Blocker' },
          { item: 'Biotin' },
          { item: 'Speciality Shampoo' },
          { item: 'Hair Conditioner' },
          { item: 'Hair Mask' }
        ]
      },
      {
        name: 'Speciality Supplements',
        slug: 'speciality-supplements',
        items: [
          { item: 'Probiotics' },
          { item: 'Collagen' },
          { item: 'DHT Blocker' },
          { item: 'Fat Loss Supplements' },
          { item: 'Performance' },
          { item: 'Glucosamine Supplements' },
          { item: 'L-Arginine' }
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
          { item: 'Green Coffee Bean Extracts' },
          { item: 'Garcinia Cambogia' },
          { item: 'Green Tea Extract' },
          { item: 'Guggul' },
          { item: 'Triphala Powder' },
          { item: 'Forskolin Extract' },
          { item: 'White Kidney Bean' }
        ]
      },
      {
        name: 'Vital Herbs',
        slug: 'vital-herbs',
        items: [
          { item: 'Ginseng' },
          { item: 'Ginkgo Biloba' },
          { item: 'Herbal Weight Gainer' },
          { item: 'Lutein' },
          { item: 'Other Herbal Supplements' },
          { item: 'Women Health Care' },
          { item: 'Rhodiola Rosea' }
        ]
      },
      {
        name: 'Antioxidants',
        slug: 'antioxidants',
        items: [
          { item: 'Milk Thistle' },
          { item: 'Spirulina' },
          { item: 'Tulsi' },
          { item: 'Turmeric' },
          { item: 'Amla' },
          { item: 'Grape Seed Extract' },
          { item: 'Resveratrol' }
        ]
      },
      {
        name: 'Herbs for Immunity',
        slug: 'herbs-immunity',
        items: [
          { item: 'Giloy' },
          { item: 'Ayush Kwath' },
          { item: 'Amla' },
          { item: 'Turmeric' },
          { item: 'Ashwagandha' },
          { item: 'Neem' },
          { item: 'Ginger' }
        ]
      },
      {
        name: 'Herbs for Personal Care',
        slug: 'herbs-personal-care',
        items: [
          { item: 'Ashwagandha' },
          { item: 'Shilajit' },
          { item: 'Musli' },
          { item: 'Maca' },
          { item: 'Horny Goat Weed' },
          { item: 'Tribulus Terrestris' },
          { item: 'Fenugreek' }
        ]
      },
      {
        name: 'Herbal Extracts',
        slug: 'herbal-extracts',
        items: [
          { item: 'Shatavari Extract' },
          { item: 'Bilberry Extract' },
          { item: 'Yashtimadhu Extract' },
          { item: 'Other Herbs Extract' },
          { item: 'Brahmi Extract' },
          { item: 'Moringa Extract' },
          { item: 'Neem Extract' }
        ]
      },
      {
        name: 'Herbs for Digestive Care',
        slug: 'herbs-digestive-care',
        items: [
          { item: 'Wheat Grass' },
          { item: 'Garlic' },
          { item: 'Triphala' },
          { item: 'Boswellia' },
          { item: 'Cinnamon' },
          { item: 'Licorice' },
          { item: 'Ginger' }
        ]
      },
      {
        name: 'Herbs for Hair Care',
        slug: 'herbs-hair-care',
        items: [
          { item: 'Saw Palmetto' },
          { item: 'Aloe Vera' },
          { item: 'Brahmi / Shankhpushpi' },
          { item: 'Moringa' },
          { item: 'Fenugreek' },
          { item: 'Neem' },
          { item: 'Bhringraj' }
        ]
      },
      {
        name: 'Herbal Oils',
        slug: 'herbal-oils',
        items: [
          { item: 'Coconut Oil' },
          { item: 'Evening Primrose Oil' },
          { item: 'Other Herbal Oils' },
          { item: 'Argan Oil' },
          { item: 'Jojoba Oil' },
          { item: 'Rosehip Oil' },
          { item: 'Tea Tree Oil' }
        ]
      },
      {
        name: 'Herbs for Diabetic Care',
        slug: 'herbs-diabetic-care',
        items: [
          { item: 'Diabetic Care' },
          { item: 'Stevia' },
          { item: 'Gymnema' },
          { item: 'Arjuna' },
          { item: 'Bitter Melon' },
          { item: 'Cinnamon Extract' },
          { item: 'Chromium Picolinate' }
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
          { item: 'Oats' },
          { item: 'Meal Replacement' },
          { item: 'Protein Shakes' },
          { item: 'Energy Drinks / Powders' },
          { item: 'Cooking Oils & Sprays' },
          { item: 'Chia Seeds' },
          { item: 'Quinoa' }
        ]
      },
      {
        name: 'Vinegar and Health Juices',
        slug: 'vinegar-health-juices',
        items: [
          { item: 'Apple Cider Vinegar' },
          { item: 'Aloe Vera Juice' },
          { item: 'Amla Juice' },
          { item: 'Wheat Grass Juice' },
          { item: 'Noni Juice' },
          { item: 'Karela Jamun Juice' },
          { item: 'Other Juices' }
        ]
      },
      {
        name: 'Protein Foods & Bars',
        slug: 'protein-foods-bars',
        items: [
          { item: 'Peanut Butter' },
          { item: 'Muesli' },
          { item: 'Protein Shakes' },
          { item: 'Oats' },
          { item: 'Cereals' },
          { item: 'Protein Bars' },
          { item: 'Energy Bars' }
        ]
      },
      {
        name: 'Protein Bars',
        slug: 'protein-bars',
        items: [
          { item: 'Protein Cookies' },
          { item: 'Nut Butters' },
          { item: 'Snack Energy Bars' },
          { item: 'Granola Bars' },
          { item: 'Meal Bars' },
          { item: 'Fiber Bars' },
          { item: 'Keto Bars' }
        ]
      },
      {
        name: 'Protein for Wellness',
        slug: 'protein-wellness',
        items: [
          { item: 'Plant Proteins' },
          { item: 'Protein for Women' },
          { item: 'Meal Replacement' },
          { item: 'Soy Protein' },
          { item: 'Protein Blends' },
          { item: 'Collagen Protein' },
          { item: 'Egg Protein' }
        ]
      },
      {
        name: 'Family Nutrition',
        slug: 'family-nutrition',
        items: [
          { item: 'Nutrition for Children' },
          { item: 'Nutrition for Adults' },
          { item: 'Senior Nutrition' },
          { item: 'Prenatal Nutrition' },
          { item: 'Teen Nutrition' },
          { item: 'Family Multivitamins' },
          { item: 'Kids Protein' }
        ]
      },
      {
        name: 'Healthy Beverages',
        slug: 'healthy-beverages',
        items: [
          { item: 'Green Tea' },
          { item: 'Herbal Tea' },
          { item: 'Matcha' },
          { item: 'Kombucha' },
          { item: 'Coconut Water' },
          { item: 'Electrolyte Drinks' },
          { item: 'Detox Teas' }
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
          { item: 'Hand Grips' },
          { item: 'Multi Gym Accessories' },
          { item: 'Ab Trainers' },
          { item: 'Ankle & Wrist Weights' },
          { item: 'Resistance Bands' },
          { item: 'Push Up Bars' },
          { item: 'Pull Up Bars' }
        ]
      },
      {
        name: 'Fitness Trackers',
        slug: 'fitness-trackers',
        items: [
          { item: 'Smart Watches' },
          { item: 'Earbuds' },
          { item: 'Heart Rate Monitors' },
          { item: 'Step Counters' },
          { item: 'Sleep Trackers' },
          { item: 'Activity Monitors' },
          { item: 'GPS Watches' }
        ]
      },
      {
        name: 'Gym Essentials',
        slug: 'gym-essentials',
        items: [
          { item: 'Resistance Bands' },
          { item: 'Gym Gloves' },
          { item: 'Jump Ropes' },
          { item: 'Gym Belts' },
          { item: 'Gym Bags' },
          { item: 'Yoga Mats' },
          { item: 'Gym Shakers' }
        ]
      },
      {
        name: 'Fitness Clothing',
        slug: 'fitness-clothing',
        items: [
          { item: 'MB Activewear' },
          { item: 'T-shirts' },
          { item: 'Shorts' },
          { item: 'Joggers' },
          { item: 'Sports Bras' },
          { item: 'Leggings' },
          { item: 'Tank Tops' }
        ]
      },
      {
        name: 'Gym Supports',
        slug: 'gym-supports',
        items: [
          { item: 'Wrist Support' },
          { item: 'Knee Support' },
          { item: 'Abdominal Support' },
          { item: 'Waist Belts' },
          { item: 'Elbow Support' },
          { item: 'Back Support' },
          { item: 'Compression Sleeves' }
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
          { item: 'Cleansers' },
          { item: 'Skin Therapy' },
          { item: 'Moisturizer' },
          { item: 'Toner' },
          { item: 'Men\'s Grooming' },
          { item: 'Face Serum' },
          { item: 'Face Mask' }
        ]
      },
      {
        name: 'Hair Care',
        slug: 'hair-care',
        items: [
          { item: 'Hair Serum' },
          { item: 'Hair Mask' },
          { item: 'Hair Oils' },
          { item: 'Speciality Shampoo' },
          { item: 'Hair Conditioner' },
          { item: 'Scalp Treatment' },
          { item: 'Hair Growth Serum' }
        ]
      },
      {
        name: 'Personal Care',
        slug: 'personal-care',
        items: [
          { item: 'Mask' },
          { item: 'Pain-Relief' },
          { item: 'Fragrances' },
          { item: 'Deodorants' },
          { item: 'Body Wash' },
          { item: 'Hand Sanitizers' },
          { item: 'Lip Care' }
        ]
      },
      {
        name: 'Herbs for Skin Care',
        slug: 'herbs-skin-care',
        items: [
          { item: 'Turmeric' },
          { item: 'Neem' },
          { item: 'Amla' },
          { item: 'Aloe Vera' },
          { item: 'Rose Water' },
          { item: 'Sandalwood' },
          { item: 'Cucumber Extract' }
        ]
      },
      {
        name: 'Herbs for Hair Growth',
        slug: 'herbs-hair-growth',
        items: [
          { item: 'Biotin' },
          { item: 'Niacin' },
          { item: 'Saw Palmetto' },
          { item: 'Fenugreek' },
          { item: 'Brahmi' },
          { item: 'Bhringraj' },
          { item: 'Onion Extract' }
        ]
      }
    ]
  }
];

async function seedCategories() {
  try {
    console.log('Starting comprehensive category seeding...');
    
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
      console.log(`✅ Created category: ${result.name} with ${category.subcategories.length} subcategories`);
    }
    
    console.log('🎉 All categories seeded successfully!');
    console.log(`📊 Total: ${categories.length} categories, ${categories.reduce((acc, cat) => acc + cat.subcategories.length, 0)} subcategories`);
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