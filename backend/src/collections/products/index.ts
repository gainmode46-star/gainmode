import { formatSlug } from '@/lib/Globals/Slug'
import type { CollectionConfig } from 'payload'

// All brands from brands page
const allBrands = [
  'ALPINO',
  'AS-IT-IS',
  'AVVATAR',
  'AESTHETIC NUTRITION',
  'BOLT',
  'BPI',
  'BEAST LIFE',
  'DYMATIZE',
  'FAST AND UP',
  'GASPARI',
  'GAT',
  'GNC',
  'GHOST',
  'HEALTH FARM',
  'INTERNATIONAL PROTEIN',
  'ISOPURE',
  'KAGED',
  'KEVIN LEVRONE',
  'LABRADA',
  'MONSTER LAB',
  'MUSCLE BLAZE',
  'MUSCLETECH',
  'MUTANT',
  'MYFITNESS',
  'MYFITNESS PEANUT BUTTER',
  'NEUHERBS',
  'NAKPRO',
  'ONE SCIENCE',
  'ON (OPTIMUM NUTRITION)',
  'POLE NUTRITION',
  'PROSUPPS',
  'PINTOLA',
  'RONNIE COLEMAN',
  'RAW NUTRITION',
  'RYSE',
  'THE WHOLE TRUTH NUTRITION',
  'WELLBEING',
  'XTEND',
  'YOGABAR',
  'RANBDS',
  'APPLIED NUTRITION',
  'BSN',
  'DENIS JAMES',
  'DEXTER JACKSON',
  'EXALT',
  'INSANE LABZ',
  'MHP',
  'MI (MUSCLE IMPACT NUTRITION) 02 BRAND',
  'NOW',
  'NUTREX',
  'NUTRAMARC',
  'REDCON',
  'RULE ONE',
  'UNIVERSAL',
]

// Categories from homeproduct.json
const categories = [
  { label: 'Sports Nutrition', value: 'SPORTS NUTRITION' },
  { label: 'Vitamins & Supplements', value: 'VITAMINS & SUPPLEMENTS' },
  { label: 'Ayurveda & Herbs', value: 'AYURVEDA & HERBS' },
  { label: 'Health Food & Drinks', value: 'HEALTH FOOD & DRINKS' },
  { label: 'Fitness', value: 'FITNESS' },
  { label: 'Wellness', value: 'WELLNESS' },
]

// Subcategories from homeproduct.json
const subcategories = [
  { label: 'Proteins', value: 'Proteins' },
  { label: 'Gainers', value: 'Gainers' },
  { label: 'Pre/Post Workout', value: 'Pre/Post Workout' },
  { label: 'Fat Burners', value: 'Fat Burners' },
  { label: 'Amino Acids', value: 'Amino Acids' },
  { label: 'Omega Fatty Acids', value: 'Omega Fatty Acids' },
  { label: 'Multivitamins', value: 'Multivitamins' },
  { label: 'Herbs for Weight Loss', value: 'Herbs for Weight Loss' },
  { label: 'Vital Herbs', value: 'Vital Herbs' },
  { label: 'Weight Loss Foods', value: 'Weight Loss Foods' },
  { label: 'Health Juices', value: 'Health Juices' },
  { label: 'Gym Accessories', value: 'Gym Accessories' },
  { label: 'Fitness Trackers', value: 'Fitness Trackers' },
  { label: 'Skin Care', value: 'Skin Care' },
  { label: 'Hair Care', value: 'Hair Care' },
]

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },

  access: {
    read: () => true, // Allow public read access
    create: () => true, // Allow public create access for seeding
    update: () => true, // Allow public update access
    delete: () => true, // Allow public delete access
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Product name (e.g., Premium Whey Protein Isolate)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'image',
      type: 'text',
      required: true,
      admin: {
        description: 'Main product image URL',
      },
    },
    {
      name: 'images',
      type: 'array',
      admin: {
        description: 'Additional product images',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Image URL',
          },
        },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      admin: {
        step: 0.1,
        description: 'Product rating (0-5 stars)',
      },
    },
    {
      name: 'reviews',
      type: 'number',
      min: 0,
      admin: {
        description: 'Number of customer reviews',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Current selling price in rupees',
      },
    },
    {
      name: 'originalPrice',
      type: 'number',
      min: 0,
      admin: {
        description: 'Original price before discount (optional)',
      },
    },
    {
      name: 'onSale',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check if product is on sale',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [...categories, { label: 'Other (type below)', value: 'other' }],
      admin: {
        description: 'Select category or choose Other to type new one',
      },
    },
    {
      name: 'customCategory',
      type: 'text',
      admin: {
        description: 'Type new category name if you selected Other above',
        condition: (data) => data.category === 'other',
      },
    },

    {
      name: 'subcategory',
      type: 'select',
      options: [...subcategories, { label: 'Other (type below)', value: 'other' }],
      admin: {
        description: 'Select subcategory or choose Other to type new one',
      },
    },
    {
      name: 'customSubcategory',
      type: 'text',
      admin: {
        description: 'Type new subcategory name if you selected Other above',
        condition: (data) => data.subcategory === 'other',
      },
    },

    {
      name: 'brand',
      type: 'select',
      required: true,
      options: [
        ...allBrands.map((brand) => ({ label: brand, value: brand })),
        { label: 'Other (type below)', value: 'other' },
      ],
      admin: {
        description: 'Select brand or choose Other to type new one',
      },
    },
    {
      name: 'customBrand',
      type: 'text',
      admin: {
        description: 'Type new brand name if you selected Other above',
        condition: (data) => data.brand === 'other',
      },
    },

    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check if this is a featured product',
      },
    },
    {
      name: 'trending',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check if this is a trending product',
      },
    },
    {
      name: 'bestSeller',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as best seller product',
      },
    },
    {
      name: 'lovedByExperts',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as loved by experts product',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Detailed product description',
      },
    },
    {
      name: 'certifications',
      type: 'array',
      admin: {
        description: 'Product certifications',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            description: 'Certification name',
          },
        },
      ],
    },
    {
      name: 'nutritionInfo',
      type: 'group',
      admin: {
        description: 'Nutrition facts per serving',
      },
      fields: [
        {
          name: 'servingSize',
          type: 'text',
          admin: {
            description: 'Serving size (e.g., 30g (1 scoop))',
          },
        },
        {
          name: 'servingsPerContainer',
          type: 'number',
          min: 0,
          admin: {
            description: 'Number of servings per container (e.g., 33)',
          },
        },
        {
          name: 'protein',
          type: 'text',
          admin: {
            description: 'Protein content (e.g., 25g)',
          },
        },
        {
          name: 'carbohydrates',
          type: 'text',
          admin: {
            description: 'Carbs content (e.g., 2g)',
          },
        },
        {
          name: 'fat',
          type: 'text',
          admin: {
            description: 'Fat content (e.g., 0.5g)',
          },
        },
        {
          name: 'calories',
          type: 'number',
          min: 0,
          admin: {
            description: 'Calories per serving (e.g., 110)',
          },
        },
        {
          name: 'sodium',
          type: 'text',
          admin: {
            description: 'Sodium content (e.g., 50mg)',
          },
        },
        {
          name: 'calcium',
          type: 'text',
          admin: {
            description: 'Calcium content (e.g., 120mg)',
          },
        },
      ],
    },
    {
      name: 'ingredients',
      type: 'array',
      admin: {
        description: 'Product ingredients list',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            description: 'Ingredient name (e.g., Whey Protein Isolate)',
          },
        },
      ],
    },
    {
      name: 'subscriptionOptions',
      type: 'group',
      admin: {
        description: 'Subscription options',
      },
      fields: [
        {
          name: 'available',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Check if subscription is available for this product',
          },
        },
        {
          name: 'discounts',
          type: 'group',
          admin: {
            description: 'Subscription discount percentages',
          },
          fields: [
            {
              name: 'monthly',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                description: 'Monthly subscription discount % (e.g., 10)',
              },
            },
            {
              name: 'quarterly',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                description: 'Quarterly subscription discount % (e.g., 15)',
              },
            },
            {
              name: 'biannual',
              type: 'number',
              min: 0,
              max: 100,
              admin: {
                description: '6-month subscription discount % (e.g., 20)',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'variants',
      type: 'array',
      admin: {
        description: 'Product variants (flavors, sizes, etc.)',
      },
      fields: [
        {
          name: 'flavor',
          type: 'text',
          admin: {
            description: 'Flavor name (e.g., Chocolate, Vanilla)',
          },
        },
        {
          name: 'weight',
          type: 'text',
          admin: {
            description: 'Size/weight (e.g., 1kg, 60 capsules)',
          },
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
          admin: {
            description: 'Price for this variant (e.g., 4199)',
          },
        },
      ],
    },
    {
      name: 'bundledOffers',
      type: 'array',
      fields: [
        {
          name: 'id',
          type: 'text',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'productIds',
          type: 'array',
          fields: [
            {
              name: 'productId',
              type: 'number',
            },
          ],
        },
        {
          name: 'originalPrice',
          type: 'number',
          min: 0,
        },
        {
          name: 'bundlePrice',
          type: 'number',
          min: 0,
        },
        {
          name: 'savings',
          type: 'number',
          min: 0,
          max: 100,
        },
      ],
    },
    {
      name: 'upsells',
      type: 'array',
      admin: {
        description: 'Upsell offers - products that complement this product',
      },
      fields: [
        {
          name: 'upsellProduct',
          type: 'relationship',
          relationTo: 'products',
          required: true,
          admin: {
            description: 'Select the product to offer as upsell',
          },
        },
        {
          name: 'discountPercentage',
          type: 'number',
          min: 0,
          max: 100,
          required: true,
          admin: {
            description: 'Discount percentage when both products are purchased together',
          },
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            description: 'Short description of why these products work well together',
          },
        },
        {
          name: 'active',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable/disable this upsell offer',
          },
        },
      ],
    },
  ],
}
