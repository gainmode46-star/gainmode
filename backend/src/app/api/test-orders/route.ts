import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Orders collection access...')

    // Test if we can access the orders collection
    const ordersResponse = await payload.find({
      collection: 'orders',
      limit: 1,
    })

    console.log('Orders collection accessible:', ordersResponse.docs.length, 'orders found')

    return NextResponse.json({
      success: true,
      message: 'Orders collection is accessible',
      orderCount: ordersResponse.docs.length,
      sampleOrder: ordersResponse.docs[0] || null,
    })
  } catch (error) {
    console.error('Orders collection test failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Orders collection test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
