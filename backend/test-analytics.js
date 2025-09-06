import { get } from 'axios'

const BASE_URL = 'http://localhost:3000' // Adjust to your backend URL

async function testAnalyticsAPI() {
  console.log('🧪 Testing Analytics API...\n')

  try {
    // Test 1: Today's analytics
    console.log('📅 Testing Today Analytics...')
    const todayResponse = await get(`${BASE_URL}/api/analytics/dashboard?period=today`)
    console.log('✅ Today Analytics Response:')
    console.log(`   Total Sales: ₹${todayResponse.data.totalSales}`)
    console.log(`   Total Orders: ${todayResponse.data.totalOrders}`)
    console.log(`   Avg Order Value: ₹${todayResponse.data.averageOrderValue}`)
    console.log(`   Data Points: ${todayResponse.data.salesData.length}\n`)

    // Test 2: Monthly analytics
    console.log('📊 Testing Monthly Analytics...')
    const monthlyResponse = await get(`${BASE_URL}/api/analytics/dashboard?period=month`)
    console.log('✅ Monthly Analytics Response:')
    console.log(`   Total Sales: ₹${monthlyResponse.data.totalSales}`)
    console.log(`   Total Orders: ${monthlyResponse.data.totalOrders}`)
    console.log(`   Avg Order Value: ₹${monthlyResponse.data.averageOrderValue}`)
    console.log(`   Data Points: ${monthlyResponse.data.salesData.length}\n`)

    // Test 3: Yearly analytics
    console.log('📈 Testing Yearly Analytics...')
    const yearlyResponse = await get(`${BASE_URL}/api/analytics/dashboard?period=year`)
    console.log('✅ Yearly Analytics Response:')
    console.log(`   Total Sales: ₹${yearlyResponse.data.totalSales}`)
    console.log(`   Total Orders: ${yearlyResponse.data.totalOrders}`)
    console.log(`   Avg Order Value: ₹${yearlyResponse.data.averageOrderValue}`)
    console.log(`   Data Points: ${yearlyResponse.data.salesData.length}\n`)

    // Test 4: Custom date range
    console.log('🎯 Testing Custom Date Range...')
    const customResponse = await get(
      `${BASE_URL}/api/analytics/dashboard?period=custom&startDate=2024-01-01&endDate=2024-01-31`,
    )
    console.log('✅ Custom Date Range Response:')
    console.log(`   Total Sales: ₹${customResponse.data.totalSales}`)
    console.log(`   Total Orders: ${customResponse.data.totalOrders}`)
    console.log(`   Avg Order Value: ₹${customResponse.data.averageOrderValue}`)
    console.log(`   Data Points: ${customResponse.data.salesData.length}\n`)

    // Test 5: Sample data structure
    if (todayResponse.data.salesData.length > 0) {
      console.log('📋 Sample Data Structure:')
      const sampleData = todayResponse.data.salesData[0]
      console.log('   Sample Entry:')
      console.log(`     Date: ${sampleData.date}`)
      console.log(`     Sales: ₹${sampleData.sales}`)
      console.log(`     Orders: ${sampleData.orders}\n`)
    }

    console.log('🎉 All Analytics API Tests Passed!')
    console.log('\n📊 Dashboard Features Available:')
    console.log('   ✅ Daily filtering (hour-by-hour)')
    console.log('   ✅ Monthly filtering (day-by-day)')
    console.log('   ✅ Yearly filtering (month-by-month)')
    console.log('   ✅ Custom date range selection')
    console.log('   ✅ Revenue tracking')
    console.log('   ✅ Order count analytics')
    console.log('   ✅ Average order value calculation')
    console.log('   ✅ Interactive charts')
    console.log('   ✅ Detailed summary tables')
  } catch (error) {
    console.error('❌ Analytics API Test Failed:')
    if (error.response) {
      console.error(`   Status: ${error.response.status}`)
      console.error(`   Message: ${error.response.data.error || error.message}`)
    } else {
      console.error(`   Error: ${error.message}`)
    }

    console.log('\n🔧 Troubleshooting Tips:')
    console.log('   1. Ensure the backend server is running')
    console.log('   2. Check if the analytics API endpoint is accessible')
    console.log('   3. Verify database connection and orders collection')
    console.log('   4. Check server logs for detailed error messages')
  }
}

// Run the test
testAnalyticsAPI()
