import { Payload } from 'payload'

export const seedHeroBanner = async (payload: Payload): Promise<void> => {
  try {
    // Check if hero banner already exists
    const existingBanner = await payload.find({
      collection: 'hero-banner',
      limit: 1,
    })

    if (existingBanner.docs.length > 0) {
      console.log('Hero banner already exists, skipping seed...')
      return
    }

    // Create default hero banner
    const heroBanner = await payload.create({
      collection: 'hero-banner',
      data: {
        title: 'Nourish Your Body & Soul',
        description: 'Premium supplements to fuel your fitness journey and enhance your well-being with science-backed nutrition.',
        ctaText: 'Explore Now',
        ctaLink: '/products',
        isActive: true,
        // Note: You'll need to upload images through the admin panel and update these IDs
        desktopImage: null, // Will be set after uploading image
        mobileImage: null,  // Will be set after uploading image
      },
    })

    console.log('Hero banner seeded successfully:', heroBanner.id)
  } catch (error) {
    console.error('Error seeding hero banner:', error)
  }
}