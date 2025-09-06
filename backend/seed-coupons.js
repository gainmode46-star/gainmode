const { getPayload } = require('payload')
const config = require('./dist/payload.config.js').default

const seedCoupons = async () => {
  try {
    const payload = await getPayload({ config })

    // Clear existing coupons
    await payload.delete({
      collection: 'coupons',
      where: {},
    })

    // Sample coupons data
    const coupons = [
      {
        code: 'WELCOME10',
        title: '10% Off Welcome Offer',
        description: 'Get 10% off on your first order. Perfect for trying our premium supplements!',
        discountType: 'percentage',
        discountValue: 10,
        minimumOrderValue: 1000,
        maximumDiscountAmount: 500,
        isActive: true,
        showOnCart: true,
        firstTimeUserOnly: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        code: 'SAVE15',
        title: '15% Off Premium Deal',
        description: 'Save 15% on orders above ₹2000. Great for stocking up on your favorites!',
        discountType: 'percentage',
        discountValue: 15,
        minimumOrderValue: 2000,
        maximumDiscountAmount: 750,
        isActive: true,
        showOnCart: true,
        expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      },
      {
        code: 'HEALTH20',
        title: '20% Off Health Bundle',
        description: 'Maximum savings! Get 20% off on orders above ₹3000. Best value for serious athletes!',
        discountType: 'percentage',
        discountValue: 20,
        minimumOrderValue: 3000,
        maximumDiscountAmount: 1000,
        isActive: true,
        showOnCart: true,
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      },
      {
        code: 'FLAT500',
        title: '₹500 Off Big Orders',
        description: 'Flat ₹500 discount on orders above ₹4000. Perfect for bulk purchases!',
        discountType: 'fixed',
        discountValue: 500,
        minimumOrderValue: 4000,
        isActive: true,
        showOnCart: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        code: 'FREESHIP',
        title: 'Free Shipping',
        description: 'Get free shipping on any order. No minimum purchase required!',
        discountType: 'free_shipping',
        discountValue: 0,
        minimumOrderValue: 0,
        isActive: true,
        showOnCart: true,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
    ]

    // Create coupons
    for (const couponData of coupons) {
      await payload.create({
        collection: 'coupons',
        data: couponData,
      })
      console.log(`✅ Created coupon: ${couponData.code}`)
    }

    console.log('🎉 All coupons seeded successfully in MongoDB!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding coupons:', error)
    process.exit(1)
  }
}

seedCoupons()