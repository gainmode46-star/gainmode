# Order Management System Setup Guide

This guide explains how to set up and use the new order management system integrated with Payload CMS for the O2 Nutrition e-commerce platform.

## 🚀 Features

- **Complete Order Lifecycle Management**: From order placement to delivery
- **Real-time Order Tracking**: Track orders by order number or email
- **Comprehensive Order Data**: Detailed order information with timeline
- **Admin Dashboard**: Manage orders through Payload CMS admin panel
- **API Integration**: RESTful API endpoints for frontend integration
- **Order Status Updates**: Automatic timeline generation and status tracking

## 📋 Prerequisites

- MongoDB database running
- Backend server with Payload CMS
- Frontend React application
- Node.js and npm/pnpm installed

## 🛠️ Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Database Configuration

Ensure your MongoDB connection string is set in your environment variables:

```bash
export DATABASE_URI="mongodb://localhost:27017/o2_nutrition"
```

### 3. Start the Backend Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 4. Access Payload Admin Panel

Navigate to `http://localhost:3000/admin` to access the Payload CMS admin panel.

## 📊 Orders Collection Structure

The orders collection includes the following fields:

### Basic Information

- `orderNumber`: Unique order identifier
- `userId`: Customer user ID
- `customerEmail`: Customer email address
- `customerName`: Customer first and last name
- `status`: Current order status

### Order Items

- `items`: Array of ordered products with details
- `pricing`: Complete pricing breakdown
- `shippingAddress`: Delivery address information
- `delivery`: Shipping method and tracking details
- `payment`: Payment method and status

### Tracking & Timeline

- `timeline`: Complete order status timeline
- `coupons`: Applied discount codes
- `notes`: Order notes and special instructions
- `metadata`: Source and tracking information

## 🔌 API Endpoints

### 1. Create Order

```http
POST /api/orders
Content-Type: application/json

{
  "userId": "user-123",
  "customerEmail": "customer@example.com",
  "items": [...],
  "total": 5000,
  "shippingAddress": {...},
  "paymentMethod": "upi"
}
```

### 2. Fetch User Orders

```http
GET /api/orders?userId=user-123
```

### 3. Track Order

```http
GET /api/orders/track?query=ORD-2024-001
```

## 🌱 Seeding Sample Data

### 1. Run the Seed Script

```bash
cd backend
node seed-orders.js
```

This will create sample orders in your database for testing.

### 2. Sample Order Data

The seed script creates orders with:

- Complete order lifecycle examples
- Different delivery methods
- Various payment methods
- Realistic timeline data
- Sample products and pricing

## 🎯 Frontend Integration

### 1. Update Order Service

The frontend order service has been updated to include:

- `trackOrder()`: Track orders by number or email
- `updateOrderStatus()`: Update order status
- Enhanced error handling

### 2. Checkout Process

The checkout process now:

- Creates orders in Payload CMS
- Stores complete order information
- Generates unique order numbers
- Tracks order metadata

### 3. Order Tracking

The order tracking page now:

- Uses real API data instead of mock data
- Displays actual order information
- Shows real-time status updates
- Provides complete order timeline

## 📱 Admin Panel Usage

### 1. View Orders

1. Navigate to `http://localhost:3000/admin`
2. Click on "Orders" in the sidebar
3. View all orders with key information

### 2. Update Order Status

1. Click on an order to edit
2. Update the status field
3. Add timeline entries
4. Save changes

### 3. Order Management

- **Filter Orders**: By status, date, customer
- **Search Orders**: By order number or email
- **Bulk Actions**: Update multiple orders
- **Export Data**: Download order information

## 🔄 Order Status Flow

```
Order Placed → Confirmed → Processing → Shipped → In Transit → Out for Delivery → Delivered
     ↓
  Cancelled/Returned/Refunded (if applicable)
```

## 📊 Order Timeline

Each order automatically generates a timeline with:

- Status changes
- Timestamps
- Descriptions
- Location information

## 🚚 Delivery Methods

- **Standard**: 5-7 business days (free above ₹1500)
- **Express**: 2-3 business days (₹199)
- **Overnight**: Next business day (₹399)

## 💳 Payment Methods

- Credit/Debit Card
- UPI
- Net Banking
- Cash on Delivery (COD)
- Digital Wallets

## 🧪 Testing

### 1. Test Order Creation

1. Add items to cart
2. Proceed to checkout
3. Fill in order details
4. Submit order
5. Verify order appears in admin panel

### 2. Test Order Tracking

1. Use sample order numbers from seed data
2. Test tracking by email address
3. Verify timeline display
4. Check order status updates

### 3. Test Admin Functions

1. Update order status
2. Add timeline entries
3. Modify order details
4. Test filtering and search

## 🐛 Troubleshooting

### Common Issues

1. **Orders not appearing**: Check MongoDB connection
2. **API errors**: Verify backend server is running
3. **Admin panel issues**: Check Payload configuration
4. **Timeline not updating**: Verify hooks are working

### Debug Steps

1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check MongoDB logs
4. Verify environment variables

## 📈 Future Enhancements

- **Email Notifications**: Order status updates
- **SMS Tracking**: Delivery updates
- **Webhook Integration**: Third-party services
- **Analytics Dashboard**: Order metrics and insights
- **Automated Status Updates**: Integration with shipping carriers

## 📚 Additional Resources

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## 🤝 Support

For issues or questions:

1. Check the troubleshooting section
2. Review API documentation
3. Check server logs
4. Contact development team

---

**Note**: This system is designed to handle real e-commerce orders. Always test thoroughly in a development environment before deploying to production.
