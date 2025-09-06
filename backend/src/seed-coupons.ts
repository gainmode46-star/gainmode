import { getPayload } from 'payload'
import config from './payload.config'

const seedCoupons = async () => {
  const payload = await getPayload({ config })

  try {
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
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
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
        expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
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
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
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
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      },
      {
        code: 'PROTEIN25',
        title: '25% Off Protein Products',
        description: 'Special discount on protein supplements. Build muscle, save money!',
        discountType: 'percentage',
        discountValue: 25,
        minimumOrderValue: 1500,
        maximumDiscountAmount: 800,
        isActive: true,
        showOnCart: true,
        expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      },
      {
        code: 'NEWUSER',
        title: 'New User Special',
        description: 'Exclusive 12% off for new customers. Welcome to O2 Nutrition!',
        discountType: 'percentage',
        discountValue: 12,
        minimumOrderValue: 800,
        maximumDiscountAmount: 400,
        isActive: true,
        showOnCart: true,
        firstTimeUserOnly: true,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      },
      {
        code: 'WEEKEND30',
        title: 'Weekend Flash Sale',
        description: 'Limited time! 30% off on weekend orders. Grab it before it ends!',
        discountType: 'percentage',
        discountValue: 30,
        minimumOrderValue: 2500,
        maximumDiscountAmount: 1200,
        isActive: false, // Can be activated for weekend sales
        showOnCart: false,
        usageLimit: 100,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    ]

    // Create coupons
    for (const couponData of coupons) {
      await payload.create({
        collection: 'coupons',
        data: couponData,
      })
      console.log(`Created coupon: ${couponData.code}`)
    }

    console.log('✅ Coupons seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding coupons:', error)
  }
}

export default seedCoupons