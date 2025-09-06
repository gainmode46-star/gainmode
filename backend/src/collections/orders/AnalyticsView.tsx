import React from 'react'
import { useConfig } from 'payload/components/utilities'
import { useRouter } from 'next/router'

const AnalyticsView: React.FC = () => {
  const { serverURL } = useConfig()
  const router = useRouter()

  const handleViewAnalytics = () => {
    // Navigate to the analytics page
    router.push('/admin/analytics')
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📊 Revenue & Orders Analytics</h1>
          <p className="text-lg text-gray-600">
            Get comprehensive insights into your business performance
          </p>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Revenue</p>
                <p className="text-2xl font-bold">₹0</p>
                <p className="text-xs opacity-75">This period</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Orders</p>
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs opacity-75">This period</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Avg Order Value</p>
                <p className="text-2xl font-bold">₹0</p>
                <p className="text-xs opacity-75">This period</p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Conversion Rate</p>
                <p className="text-2xl font-bold">0%</p>
                <p className="text-xs opacity-75">This period</p>
              </div>
              <div className="text-3xl">🎯</div>
            </div>
          </div>
        </div>

        {/* Filter Options Preview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📅 Filter Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl mb-2">📅</div>
              <h3 className="font-semibold text-gray-900">Daily View</h3>
              <p className="text-sm text-gray-600">Hour-by-hour breakdown</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">Monthly View</h3>
              <p className="text-sm text-gray-600">Day-by-day breakdown</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900">Yearly View</h3>
              <p className="text-sm text-gray-600">Month-by-month breakdown</p>
            </div>
          </div>
        </div>

        {/* Main Action Button */}
        <div className="text-center">
          <button
            onClick={handleViewAnalytics}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Launch Analytics Dashboard
          </button>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🚀 Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Real-time data updates
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Interactive charts & graphs
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Export functionality
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-3">✓</span>
                Mobile responsive design
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Analytics Metrics</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <span className="text-blue-500 mr-3">📈</span>
                Revenue trends & patterns
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-blue-500 mr-3">📦</span>
                Order volume analysis
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-blue-500 mr-3">💰</span>
                Customer spending patterns
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-blue-500 mr-3">🎯</span>
                Performance insights
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <p>
                <strong>Daily View:</strong> Best for monitoring real-time performance
              </p>
              <p>
                <strong>Monthly View:</strong> Great for weekly planning and analysis
              </p>
            </div>
            <div>
              <p>
                <strong>Yearly View:</strong> Perfect for strategic planning
              </p>
              <p>
                <strong>Custom Range:</strong> Analyze specific periods of interest
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsView
