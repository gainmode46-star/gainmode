import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'today'
    const customStartDate = searchParams.get('startDate')
    const customEndDate = searchParams.get('endDate')

    console.log('Analytics API called with period:', period)

    // Calculate date ranges
    const now = new Date()
    let startDate: Date
    let endDate: Date = now

    if (period === 'custom' && customStartDate && customEndDate) {
      startDate = new Date(customStartDate)
      endDate = new Date(customEndDate)
      // Set end date to end of day
      endDate.setHours(23, 59, 59, 999)
    } else {
      switch (period) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          break
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          break
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1)
          break
        default:
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      }
    }

    console.log('Date range:', { startDate, endDate })

    // First, check if the orders collection exists and is accessible
    let orders: any[] = []
    let useMockData = false

    try {
      const collections = Object.keys(payload.collections)
      console.log('Available collections:', collections)

      if (!collections.includes('orders')) {
        console.log('Orders collection not found, using mock data for testing')
        useMockData = true
      } else {
        // Fetch orders within the date range
        const ordersResponse = await payload.find({
          collection: 'orders',
          where: {
            and: [
              {
                createdAt: {
                  greater_than_equal: startDate.toISOString(),
                  less_than_equal: endDate.toISOString(),
                },
              },
              {
                'payment.status': {
                  equals: 'paid',
                },
              },
            ],
          },
          limit: 1000, // Adjust based on your needs
        })

        orders = ordersResponse.docs
        console.log('Orders found:', orders.length)
      }
    } catch (collectionError) {
      console.error('Error accessing orders collection:', collectionError)
      console.log('Using mock data due to collection access error')
      useMockData = true
    }

    // If using mock data, generate sample data for testing
    if (useMockData) {
      orders = generateMockOrders(startDate, endDate, period)
      console.log('Generated mock orders:', orders.length)
    }

    // Calculate metrics
    const totalSales = orders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0)
    const totalOrders = orders.length
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

    // Generate sales data for chart
    const salesData = generateSalesData(orders, startDate, endDate, period)

    return NextResponse.json({
      totalSales,
      totalOrders,
      averageOrderValue,
      salesData,
      period,
      dateRange: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
      isMockData: useMockData,
      message: useMockData
        ? 'Using mock data for testing - Orders collection not available'
        : 'Real data from Orders collection',
    })
  } catch (error) {
    console.error('Analytics API error:', error)

    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    if (errorMessage.includes("can't be found")) {
      return NextResponse.json(
        {
          error: 'Orders collection not accessible',
          message:
            'The Orders collection is not available. Please restart the server or check the collection configuration.',
          suggestion: 'Try restarting the backend server to reload collection configurations',
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch analytics data',
        message: errorMessage,
        suggestion: 'Check server logs for more details',
      },
      { status: 500 },
    )
  }
}

function generateMockOrders(startDate: Date, endDate: Date, period: string) {
  const mockOrders = []
  const basePrice = 1500 // Base order price in INR

  if (period === 'today') {
    // Generate 24 mock orders for today (one per hour)
    for (let hour = 0; hour < 24; hour++) {
      const orderTime = new Date(startDate)
      orderTime.setHours(hour, Math.floor(Math.random() * 60), 0, 0)

      mockOrders.push({
        id: `mock-${hour}`,
        createdAt: orderTime.toISOString(),
        pricing: {
          total: basePrice + Math.floor(Math.random() * 1000),
        },
      })
    }
  } else if (period === 'month') {
    // Generate mock orders for each day of the month
    const daysInMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
      const orderCount = Math.floor(Math.random() * 5) + 1 // 1-5 orders per day

      for (let order = 0; order < orderCount; order++) {
        const orderTime = new Date(startDate.getFullYear(), startDate.getMonth(), day)
        orderTime.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0)

        mockOrders.push({
          id: `mock-${day}-${order}`,
          createdAt: orderTime.toISOString(),
          pricing: {
            total: basePrice + Math.floor(Math.random() * 2000),
          },
        })
      }
    }
  } else if (period === 'year') {
    // Generate mock orders for each month
    for (let month = 0; month < 12; month++) {
      const orderCount = Math.floor(Math.random() * 20) + 10 // 10-30 orders per month

      for (let order = 0; order < orderCount; order++) {
        const orderTime = new Date(
          startDate.getFullYear(),
          month,
          Math.floor(Math.random() * 28) + 1,
        )
        orderTime.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0)

        mockOrders.push({
          id: `mock-${month}-${order}`,
          createdAt: orderTime.toISOString(),
          pricing: {
            total: basePrice + Math.floor(Math.random() * 3000),
          },
        })
      }
    }
  }

  return mockOrders
}

function generateSalesData(orders: any[], startDate: Date, endDate: Date, period: string) {
  const salesData: { date: string; sales: number; orders: number }[] = []

  if (period === 'today') {
    // Group by hour for today
    for (let hour = 0; hour < 24; hour++) {
      const hourStart = new Date(startDate)
      hourStart.setHours(hour, 0, 0, 0)
      const hourEnd = new Date(hourStart)
      hourEnd.setHours(hour + 1, 0, 0, 0)

      const hourOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt)
        return orderDate >= hourStart && orderDate < hourEnd
      })

      const hourSales = hourOrders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0)

      salesData.push({
        date: hourStart.toISOString(),
        sales: hourSales,
        orders: hourOrders.length,
      })
    }
  } else if (period === 'month') {
    // Group by day for month
    const daysInMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStart = new Date(startDate.getFullYear(), startDate.getMonth(), day)
      const dayEnd = new Date(dayStart)
      dayEnd.setDate(day + 1)

      const dayOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt)
        return orderDate >= dayStart && orderDate < dayEnd
      })

      const daySales = dayOrders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0)

      salesData.push({
        date: dayStart.toISOString(),
        sales: daySales,
        orders: dayOrders.length,
      })
    }
  } else if (period === 'year') {
    // Group by month for year
    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(startDate.getFullYear(), month, 1)
      const monthEnd = new Date(startDate.getFullYear(), month + 1, 1)

      const monthOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt)
        return orderDate >= monthStart && orderDate < monthEnd
      })

      const monthSales = monthOrders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0)

      salesData.push({
        date: monthStart.toISOString(),
        sales: monthSales,
        orders: monthOrders.length,
      })
    }
  } else if (period === 'custom') {
    // For custom date range, group by day
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    for (let day = 0; day <= daysDiff; day++) {
      const dayStart = new Date(startDate)
      dayStart.setDate(startDate.getDate() + day)
      const dayEnd = new Date(dayStart)
      dayEnd.setDate(dayStart.getDate() + 1)

      const dayOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt)
        return orderDate >= dayStart && orderDate < dayEnd
      })

      const daySales = dayOrders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0)

      salesData.push({
        date: dayStart.toISOString(),
        sales: daySales,
        orders: dayOrders.length,
      })
    }
  }

  return salesData
}
