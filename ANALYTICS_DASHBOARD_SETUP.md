# Revenue & Orders Analytics Dashboard Setup

This guide explains how to set up and use the comprehensive analytics dashboard for monitoring revenue and order counts with daily, monthly, and yearly filtering capabilities.

## 🚀 Features

- **Real-time Revenue Tracking**: Monitor total revenue, order counts, and average order values
- **Flexible Time Filtering**:
  - Daily view (hour-by-hour breakdown)
  - Monthly view (day-by-day breakdown)
  - Yearly view (month-by-month breakdown)
  - Custom date range selection
- **Interactive Visualizations**: Bar charts showing revenue and orders trends
- **Detailed Metrics**: Conversion rates, performance insights, and detailed summaries
- **Admin Panel Integration**: Seamlessly integrated with Payload CMS admin

## 📁 File Structure

```
backend/
├── src/
│   ├── app/
│   │   └── api/
│   │       └── analytics/
│   │           └── dashboard/
│   │               └── route.ts          # Analytics API endpoint
│   ├── components/
│   │   ├── AnalyticsDashboard.tsx       # Main dashboard component
│   │   └── AdminAnalyticsView.tsx       # Admin panel integration view
│   └── collections/
│       └── orders/
│           └── AnalyticsView.tsx        # Orders collection analytics view
```

## 🛠️ Setup Instructions

### 1. API Endpoint

The analytics API endpoint is located at `/api/analytics/dashboard` and provides:

- **GET Parameters**:
  - `period`: `today`, `month`, `year`, or `custom`
  - `startDate`: Custom start date (YYYY-MM-DD format)
  - `endDate`: Custom end date (YYYY-MM-DD format)

- **Response Data**:
  ```json
  {
    "totalSales": 15000,
    "totalOrders": 25,
    "averageOrderValue": 600,
    "salesData": [
      {
        "date": "2024-01-01T00:00:00.000Z",
        "sales": 1200,
        "orders": 2
      }
    ],
    "period": "month",
    "dateRange": {
      "start": "2024-01-01T00:00:00.000Z",
      "end": "2024-01-31T23:59:59.999Z"
    }
  }
  ```

### 2. Dashboard Component

The `AnalyticsDashboard` component provides:

- **Filter Controls**: Quick period selection and custom date range picker
- **Key Metrics Cards**: Revenue, orders, average order value, and conversion rate
- **Interactive Chart**: Dual-axis chart showing revenue and orders trends
- **Detailed Summary Table**: Period-by-period breakdown of all metrics

### 3. Admin Panel Integration

#### Option A: Direct Access

Navigate directly to `/admin/analytics` in your admin panel to access the full dashboard.

#### Option B: Orders Collection Integration

The analytics view is integrated into the Orders collection, providing quick access to analytics from the orders management interface.

## 📊 Usage Guide

### Daily View

- Shows hour-by-hour breakdown (24 hours)
- Best for monitoring real-time performance
- Useful for identifying peak business hours

### Monthly View

- Shows day-by-day breakdown (1-31 days)
- Great for weekly planning and analysis
- Helps identify weekly patterns and trends

### Yearly View

- Shows month-by-month breakdown (12 months)
- Perfect for strategic planning
- Useful for seasonal analysis and year-over-year comparisons

### Custom Date Range

- Select specific start and end dates
- Flexible analysis for any time period
- Useful for analyzing specific events or campaigns

## 🔧 Customization

### Adding New Metrics

To add new metrics to the dashboard:

1. Update the API endpoint in `route.ts`:

```typescript
// Add new calculation
const newMetric = calculateNewMetric(orders);

// Include in response
return NextResponse.json({
  // ... existing metrics
  newMetric,
});
```

2. Update the dashboard component interface:

```typescript
interface AnalyticsData {
  // ... existing fields
  newMetric: number;
}
```

3. Add the metric display in the component:

```typescript
<div className="bg-white p-6 rounded-lg shadow-sm border">
  <p className="text-sm font-medium text-gray-600">New Metric</p>
  <p className="text-2xl font-bold text-gray-900">{data.newMetric}</p>
</div>
```

### Styling Customization

The dashboard uses Tailwind CSS classes. You can customize:

- **Colors**: Modify the color classes (e.g., `bg-blue-500` to `bg-red-500`)
- **Layout**: Adjust grid layouts and spacing
- **Components**: Modify card designs and chart styles

## 📱 Responsive Design

The dashboard is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile devices

All charts and tables automatically adjust to screen size.

## 🔒 Security Considerations

- The analytics API only returns data for orders with `payment.status = 'paid'`
- Access is controlled through Payload CMS authentication
- No sensitive customer information is exposed in the analytics

## 🚨 Troubleshooting

### Common Issues

1. **No Data Displayed**
   - Check if there are orders with `payment.status = 'paid'`
   - Verify the date range is correct
   - Check browser console for API errors

2. **Chart Not Rendering**
   - Ensure the `salesData` array is not empty
   - Check for JavaScript errors in the console
   - Verify all required props are passed

3. **API Errors**
   - Check server logs for backend errors
   - Verify the API endpoint is accessible
   - Check database connection

### Debug Mode

Enable debug logging by adding console logs in the API endpoint:

```typescript
console.log("Orders found:", orders.length);
console.log("Date range:", { startDate, endDate });
console.log("Sales data:", salesData);
```

## 📈 Performance Optimization

- **Data Caching**: Consider implementing Redis caching for frequently accessed data
- **Pagination**: For large datasets, implement pagination in the API
- **Lazy Loading**: Load chart data only when needed
- **Debouncing**: Implement debouncing for date picker changes

## 🔄 Future Enhancements

Potential improvements to consider:

- **Export Functionality**: PDF/Excel export of analytics data
- **Email Reports**: Automated daily/weekly/monthly reports
- **Advanced Filtering**: Filter by product category, customer segment, etc.
- **Real-time Updates**: WebSocket integration for live data updates
- **Comparative Analysis**: Year-over-year, month-over-month comparisons
- **Predictive Analytics**: Sales forecasting and trend predictions

## 📞 Support

For technical support or feature requests:

1. Check the existing documentation
2. Review the code comments and types
3. Test with sample data
4. Check server logs for errors

## 📝 Changelog

### Version 1.0.0

- Initial release with basic analytics functionality
- Daily, monthly, and yearly filtering
- Custom date range selection
- Interactive charts and detailed metrics
- Admin panel integration
- Responsive design for all devices
