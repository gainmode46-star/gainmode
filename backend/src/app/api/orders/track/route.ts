import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../payload.config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderQuery = searchParams.get('query') // Can be order number or email

    if (!orderQuery) {
      return NextResponse.json({ error: 'Order number or email required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Search by order number or email
    const result = await payload.find({
      collection: 'orders',
      where: {
        or: [
          {
            orderNumber: {
              equals: orderQuery,
            },
          },
          {
            customerEmail: {
              equals: orderQuery,
            },
          },
        ],
      },
      limit: 10,
    })

    if (result.docs.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order not found',
        },
        { status: 404 },
      )
    }

    // Return the most recent order if multiple found
    const order = result.docs[0]

    // Transform the order data for frontend consumption
    const transformedOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      estimatedDelivery: order.delivery?.estimatedDelivery,
      actualDelivery: order.delivery?.actualDelivery,
      items:
        order.items?.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          variant: item.variant,
          weight: item.weight,
        })) || [],
      tracking: {
        carrier: order.delivery?.carrier || 'Standard Shipping',
        trackingNumber: order.delivery?.trackingNumber || `TRK${order.id}`,
      },
      timeline: order.timeline || [
        {
          status: 'order_placed',
          title: 'Order Placed',
          description: 'Your order has been successfully placed.',
          timestamp: order.createdAt,
          completed: true,
        },
      ],
      total: order.pricing?.total || 0,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.payment?.method,
      paymentStatus: order.payment?.status,
    }

    return NextResponse.json({
      success: true,
      order: transformedOrder,
    })
  } catch (error) {
    console.error('Error tracking order:', error)
    return NextResponse.json({ error: 'Failed to track order' }, { status: 500 })
  }
}
