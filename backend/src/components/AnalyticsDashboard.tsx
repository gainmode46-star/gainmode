'use client'
import React, { useState, useEffect } from 'react'

interface AnalyticsData {
  totalSales: number
  totalOrders: number
  averageOrderValue: number
  salesData: { date: string; sales: number; orders: number }[]
  period: string
  dateRange: {
    start: string
    end: string
  }
  isMockData?: boolean
  message?: string
}

interface FilterOptions {
  period: 'today' | 'month' | 'year'
  customStartDate?: string
  customEndDate?: string
}

const AnalyticsDashboard: React.FC = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ period: 'today' })
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false)

  useEffect(() => {
    fetchAnalytics()
  }, [filterOptions])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      let url = `/api/analytics/dashboard?period=${filterOptions.period}`

      if (filterOptions.customStartDate && filterOptions.customEndDate) {
        url = `/api/analytics/dashboard?period=custom&startDate=${filterOptions.customStartDate}&endDate=${filterOptions.customEndDate}`
      }

      const response = await fetch(url)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount)
  }

  const formatDate = (dateString: string, period: string) => {
    const date = new Date(dateString)

    switch (period) {
      case 'today':
        return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      case 'month':
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
      case 'year':
        return date.toLocaleDateString('en-IN', { month: 'short' })
      default:
        return date.toLocaleDateString('en-IN')
    }
  }

  const handlePeriodChange = (period: 'today' | 'month' | 'year') => {
    setFilterOptions({ period })
    setShowCustomDatePicker(false)
  }

  const handleCustomDateChange = () => {
    if (filterOptions.customStartDate && filterOptions.customEndDate) {
      fetchAnalytics()
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 h-24 rounded"></div>
            ))}
          </div>
          <div className="bg-gray-200 h-64 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Revenue & Orders Analytics</h1>

        {/* Enhanced Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Period Selector */}
          <div className="flex space-x-2">
            {(['today', 'month', 'year'] as const).map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterOptions.period === p && !showCustomDatePicker
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          {/* Custom Date Range */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showCustomDatePicker
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Custom Range
            </button>

            {showCustomDatePicker && (
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={filterOptions.customStartDate || ''}
                  onChange={(e) =>
                    setFilterOptions((prev) => ({ ...prev, customStartDate: e.target.value }))
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={filterOptions.customEndDate || ''}
                  onChange={(e) =>
                    setFilterOptions((prev) => ({ ...prev, customEndDate: e.target.value }))
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleCustomDateChange}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Date Range Display */}
        {data && (
          <div className="text-sm text-gray-600 mb-4">
            Showing data from{' '}
            {new Date(data.dateRange.start).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            to{' '}
            {new Date(data.dateRange.end).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        )}

        {/* Mock Data Notification */}
        {data?.isMockData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Demo Mode - Using Sample Data
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    {data.message ||
                      'The Orders collection is not currently available. This dashboard is showing sample data for demonstration purposes.'}
                  </p>
                  <p className="mt-1">
                    <strong>To see real data:</strong> Ensure the Orders collection is properly
                    configured and restart the server.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {data && (
        <>
          {/* Enhanced Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(data.totalSales)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {data.period === 'today'
                      ? 'Today'
                      : data.period === 'month'
                        ? 'This Month'
                        : 'This Year'}
                  </p>
                  {data.isMockData && <p className="text-xs text-yellow-600 mt-1">📊 Demo Data</p>}
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{data.totalOrders}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {data.period === 'today'
                      ? 'Today'
                      : data.period === 'month'
                        ? 'This Month'
                        : 'This Year'}
                  </p>
                  {data.isMockData && <p className="text-xs text-yellow-600 mt-1">📊 Demo Data</p>}
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(data.averageOrderValue)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {data.period === 'today'
                      ? 'Today'
                      : data.period === 'month'
                        ? 'This Month'
                        : 'This Year'}
                  </p>
                  {data.isMockData && <p className="text-xs text-yellow-600 mt-1">📊 Demo Data</p>}
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {data.totalOrders > 0
                      ? ((data.totalOrders / (data.totalOrders + 10)) * 100).toFixed(1)
                      : 0}
                    %
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {data.period === 'today'
                      ? 'Today'
                      : data.period === 'month'
                        ? 'This Month'
                        : 'This Year'}
                  </p>
                  {data.isMockData && <p className="text-xs text-yellow-600 mt-1">📊 Demo Data</p>}
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Revenue & Orders Trend -{' '}
              {filterOptions.period.charAt(0).toUpperCase() + filterOptions.period.slice(1)}
            </h2>

            {data.salesData.length > 0 ? (
              <>
                <div className="h-80 flex items-end space-x-1">
                  {data.salesData.map((item, index) => {
                    const maxSales = Math.max(...data.salesData.map((d) => d.sales))
                    const maxOrders = Math.max(...data.salesData.map((d) => d.orders))

                    const salesHeight = maxSales > 0 ? (item.sales / maxSales) * 100 : 0
                    const ordersHeight = maxOrders > 0 ? (item.orders / maxOrders) * 100 : 0

                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        {/* Revenue Bar */}
                        <div
                          className="bg-blue-500 w-full rounded-t transition-all duration-300 hover:bg-blue-600 cursor-pointer"
                          style={{ height: `${salesHeight}%` }}
                          title={`Revenue: ${formatCurrency(item.sales)}`}
                        ></div>

                        {/* Orders Bar */}
                        <div
                          className="bg-green-400 w-full rounded-t transition-all duration-300 hover:bg-green-500 cursor-pointer"
                          style={{ height: `${ordersHeight}%` }}
                          title={`Orders: ${item.orders}`}
                        ></div>

                        {/* Date Label */}
                        <p className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-left">
                          {formatDate(item.date, data.period)}
                        </p>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-400 rounded"></div>
                    <span className="text-sm text-gray-600">Orders</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                No data available for the selected period
              </div>
            )}
          </div>

          {/* Summary Table */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Summary</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Order Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.salesData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(item.date, data.period)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatCurrency(item.sales)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.orders > 0
                          ? formatCurrency(item.sales / item.orders)
                          : formatCurrency(0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AnalyticsDashboard
