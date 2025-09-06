import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Fetch orders from Payload CMS
    const result = await payload.find({
      collection: 'orders',
      where: {
        userId: {
          equals: userId,
        },
      },
      sort: '-createdAt',
      limit: 100,
    })

    return NextResponse.json({ success: true, orders: result.docs })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const payload = await getPayload({ config })

    // Transform frontend data to match Payload schema
    const orderData = {
      userId: data.userId,
      customerEmail: data.customerEmail,
      customerName: {
        firstName: data.shippingAddress?.firstName || data.customerName?.firstName || '',
        lastName: data.shippingAddress?.lastName || data.customerName?.lastName || '',
      },
      status: 'pending',
      items:
        data.items?.map((item: any) => ({
          productId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant,
          weight: item.weight,
          isUpsell: item.isUpsell || false,
          upsellDiscount: item.upsellDiscount || 0,
          originalPrice: item.originalPrice || item.price,
        })) || [],
      pricing: {
        subtotal: data.subtotal || data.total,
        discountAmount: data.discountAmount || 0,
        shippingCost: data.shippingCost || 0,
        taxAmount: data.taxAmount || 0,
        total: data.total,
      },
      shippingAddress: {
        firstName: data.shippingAddress?.firstName || '',
        lastName: data.shippingAddress?.lastName || '',
        address: data.shippingAddress?.address || '',
        apartment: data.shippingAddress?.apartment || '',
        city: data.shippingAddress?.city || '',
        state: data.shippingAddress?.state || '',
        zipCode: data.shippingAddress?.zipCode || '',
        phone: data.shippingAddress?.phone || '',
        country: 'India',
      },
      delivery: {
        method: data.deliveryMethod || 'standard',
        estimatedDelivery: data.estimatedDelivery,
        trackingNumber: data.trackingNumber,
        carrier: data.carrier,
      },
      payment: {
        method: data.paymentMethod?.toLowerCase() || 'cod',
        status: 'pending',
        transactionId: data.transactionId,
      },
      coupons: data.coupons || [],
      notes: data.notes || '',
      metadata: {
        source: 'website',
        userAgent: request.headers.get('user-agent') || '',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        referrer: request.headers.get('referer') || '',
      },
    }

    // Create order in Payload CMS
    const order = await payload.create({
      collection: 'orders',
      data: orderData,
    })

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
