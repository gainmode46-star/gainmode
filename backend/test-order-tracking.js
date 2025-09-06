const API_BASE = 'http://localhost:3000/api'

async function testOrderTracking() {
  console.log('🧪 Testing Order Tracking API...\n')

  try {
    // Test 1: Track order by order number
    console.log('📋 Test 1: Tracking order by order number')
    const orderResponse = await fetch(`${API_BASE}/orders/track?query=ORD-2024-001`)
    const orderData = await orderResponse.json()

    if (orderData.success) {
      console.log('✅ Order found:', orderData.order.orderNumber)
      console.log('   Status:', orderData.order.status)
      console.log(
        '   Customer:',
        orderData.order.shippingAddress?.firstName,
        orderData.order.shippingAddress?.lastName,
      )
      console.log('   Total:', `₹${orderData.order.total}`)
    } else {
      console.log('❌ Order not found')
    }

    console.log('\n📧 Test 2: Tracking order by email')
    const emailResponse = await fetch(`${API_BASE}/orders/track?query=john.doe@example.com`)
    const emailData = await emailResponse.json()

    if (emailData.success) {
      console.log('✅ Order found by email:', emailData.order.orderNumber)
      console.log('   Status:', emailData.order.status)
    } else {
      console.log('❌ Order not found by email')
    }

    console.log('\n🔍 Test 3: Tracking non-existent order')
    const fakeResponse = await fetch(`${API_BASE}/orders/track?query=FAKE-ORDER-123`)
    const fakeData = await fakeResponse.json()

    if (!fakeData.success) {
      console.log('✅ Correctly handled non-existent order')
    } else {
      console.log('❌ Unexpectedly found fake order')
    }

    console.log('\n📊 Test 4: Fetching user orders')
    const userOrdersResponse = await fetch(`${API_BASE}/orders?userId=user-001`)
    const userOrdersData = await userOrdersResponse.json()

    if (userOrdersData.success) {
      console.log('✅ User orders fetched:', userOrdersData.orders.length, 'orders')
      userOrdersData.orders.forEach((order) => {
        console.log(`   - ${order.orderNumber}: ${order.status}`)
      })
    } else {
      console.log('❌ Failed to fetch user orders')
    }
  } catch (error) {
    console.error('❌ Error testing API:', error.message)
  }
}

async function testOrderCreation() {
  console.log('\n🛒 Testing Order Creation API...\n')

  try {
    const testOrder = {
      userId: 'test-user-001',
      customerEmail: 'test@example.com',
      items: [
        {
          id: 'test-prod-001',
          name: 'Test Product',
          image: '/test-image.jpg',
          price: 1000,
          quantity: 2,
          variant: 'Test Variant',
          weight: '500g',
        },
      ],
      subtotal: 2000,
      total: 2099,
      shippingCost: 99,
      discountAmount: 0,
      deliveryMethod: 'standard',
      paymentMethod: 'cod',
      shippingAddress: {
        firstName: 'Test',
        lastName: 'User',
        address: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        zipCode: '123456',
        phone: '+91 9876543210',
      },
    }

    console.log('📝 Creating test order...')
    const createResponse = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testOrder),
    })

    const createData = await createResponse.json()

    if (createData.success) {
      console.log('✅ Test order created successfully')
      console.log('   Order Number:', createData.order.orderNumber)
      console.log('   Order ID:', createData.order.id)

      // Test tracking the newly created order
      console.log('\n🔍 Testing tracking of newly created order...')
      const trackResponse = await fetch(
        `${API_BASE}/orders/track?query=${createData.order.orderNumber}`,
      )
      const trackData = await trackResponse.json()

      if (trackData.success) {
        console.log('✅ New order can be tracked successfully')
      } else {
        console.log('❌ New order cannot be tracked')
      }
    } else {
      console.log('❌ Failed to create test order:', createData.error)
    }
  } catch (error) {
    console.error('❌ Error testing order creation:', error.message)
  }
}

async function runTests() {
  console.log('🚀 Starting Order Management API Tests\n')
  console.log('Make sure your backend server is running on http://localhost:3000\n')

  await testOrderTracking()
  await testOrderCreation()

  console.log('\n✨ Tests completed!')
  console.log('\nTo run these tests:')
  console.log('1. Ensure backend server is running')
  console.log('2. Run: node test-order-tracking.js')
  console.log('3. Check the results above')
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests()
}

module.exports = { testOrderTracking, testOrderCreation }
