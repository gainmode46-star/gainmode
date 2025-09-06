import { NextRequest, NextResponse } from 'next/server'
import payload, { CollectionSlug } from 'payload'

// POST /api/categories/seed - Seed categories with sample data
export async function POST(request: NextRequest) {
  try {
    const sampleCategories = [
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
              { item: 'Protein Blends' },
              { item: 'Casein Proteins' },
              { item: 'Soy Proteins' },
            ],
          },
          {
            name: 'Gainers',
            slug: 'gainers',
            items: [
              { item: 'Weight Gainers' },
              { item: 'Mass Gainers' },
              { item: 'Herbal Weight Gainers' },
            ],
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
            ],
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
              { item: 'EAA' },
              { item: 'Nitric Oxide' },
              { item: 'Other Supports' },
              { item: 'Citrulline Malate' },
            ],
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
            ],
          },
        ],
      },
    ]

    const createdCategories = []

    for (const categoryData of sampleCategories) {
      try {
        const category = await payload.create({
          collection: 'category' as CollectionSlug,
          data: categoryData as any,
        })
        createdCategories.push(category)
      } catch (error) {
        console.error(`Error creating category ${categoryData.name}:`, error)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdCategories.length} categories`,
      data: createdCategories,
    })
  } catch (error) {
    console.error('Error seeding categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to seed categories' },
      { status: 500 },
    )
  }
}
