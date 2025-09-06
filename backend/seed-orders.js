import { MongoClient } from 'mongodb'

const MONGODB_URI =
  process.env.DATABASE_URI ||
  'mongodb+srv://gainmode46:XnjDxAwNf6Gx3Reo@cluster0.2zketsh.mongodb.net/gain?retryWrites=true&w=majority&appName=Cluster0'

const sampleOrders = [
  {
    orderNumber: 'ORD-2024-001',
    userId: 'user-001',
    customerEmail: 'john.doe@example.com',
    customerName: {
      firstName: 'John',
      lastName: 'Doe',
    },
    status: 'delivered',
    items: [
      {
        productId: 'prod-001',
        name: 'Gold Standard 100% Whey Protein',
        image: '/images/whey-protein.jpg',
        price: 4199,
        quantity: 2,
        variant: 'Chocolate',
        weight: '1kg',
        isUpsell: false,
        upsellDiscount: 0,
        originalPrice: 4199,
      },
      {
        productId: 'prod-002',
        name: 'Creatine Monohydrate Powder',
        image: '/images/creatine.jpg',
        price: 899,
        quantity: 1,
        variant: 'Unflavored',
        weight: '300g',
        isUpsell: true,
        upsellDiscount: 15,
        originalPrice: 899,
      },
    ],
    pricing: {
      subtotal: 9297,
      discountAmount: 135,
      shippingCost: 0,
      taxAmount: 0,
      total: 9162,
    },
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main Street',
      apartment: 'Apt 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      phone: '+91 9876543210',
      country: 'India',
    },
    delivery: {
      method: 'standard',
      estimatedDelivery: new Date('2024-01-28'),
      actualDelivery: new Date('2024-01-26'),
      trackingNumber: 'TRK123456789',
      carrier: 'FedEx',
    },
    payment: {
      method: 'upi',
      status: 'paid',
      transactionId: 'TXN123456789',
      paidAt: new Date('2024-01-20'),
    },
    coupons: [
      {
        code: 'WELCOME10',
        title: 'Welcome Discount',
        discountType: 'percentage',
        discountValue: 10,
        discountAmount: 135,
      },
    ],
    notes: 'Please deliver in the morning',
    timeline: [
      {
        status: 'order_placed',
        title: 'Order Placed',
        description: 'Your order has been successfully placed.',
        timestamp: new Date('2024-01-20T10:00:00Z'),
        location: 'Mumbai, India',
      },
      {
        status: 'order_confirmed',
        title: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared.',
        timestamp: new Date('2024-01-20T14:00:00Z'),
        location: 'Mumbai, India',
      },
      {
        status: 'processing',
        title: 'Processing',
        description: 'Your order is being prepared for shipment.',
        timestamp: new Date('2024-01-21T09:00:00Z'),
        location: 'Mumbai, India',
      },
      {
        status: 'shipped',
        title: 'Shipped',
        description: 'Your order has been shipped and is on its way.',
        timestamp: new Date('2024-01-22T11:00:00Z'),
        location: 'Mumbai, India',
      },
      {
        status: 'in_transit',
        title: 'In Transit',
        description: 'Your package is currently in transit to your address.',
        timestamp: new Date('2024-01-23T15:00:00Z'),
        location: 'Mumbai, India',
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Your package is out for delivery.',
        timestamp: new Date('2024-01-26T08:00:00Z'),
        location: 'Mumbai, India',
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Your order has been delivered successfully.',
        timestamp: new Date('2024-01-26T12:00:00Z'),
        location: 'Mumbai, India',
      },
    ],
    metadata: {
      source: 'website',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ipAddress: '192.168.1.1',
      referrer: 'https://o2nutrition.com/products',
    },
  },
  {
    orderNumber: 'ORD-2024-002',
    userId: 'user-002',
    customerEmail: 'jane.smith@example.com',
    customerName: {
      firstName: 'Jane',
      lastName: 'Smith',
    },
    status: 'in_transit',
    items: [
      {
        productId: 'prod-003',
        name: 'BCAA Powder',
        image: '/images/bcaa.jpg',
        price: 1299,
        quantity: 1,
        variant: 'Fruit Punch',
        weight: '500g',
        isUpsell: false,
        upsellDiscount: 0,
        originalPrice: 1299,
      },
    ],
    pricing: {
      subtotal: 1299,
      discountAmount: 0,
      shippingCost: 99,
      taxAmount: 0,
      total: 1398,
    },
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      address: '456 Oak Avenue',
      apartment: '',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      phone: '+91 9876543211',
      country: 'India',
    },
    delivery: {
      method: 'express',
      estimatedDelivery: new Date('2024-01-29'),
      actualDelivery: null,
      trackingNumber: 'TRK987654321',
      carrier: 'DHL',
    },
    payment: {
      method: 'credit_card',
      status: 'paid',
      transactionId: 'TXN987654321',
      paidAt: new Date('2024-01-25T16:00:00Z'),
    },
    coupons: [],
    notes: '',
    timeline: [
      {
        status: 'order_placed',
        title: 'Order Placed',
        description: 'Your order has been successfully placed.',
        timestamp: new Date('2024-01-25T16:00:00Z'),
        location: 'Delhi, India',
      },
      {
        status: 'order_confirmed',
        title: 'Order Confirmed',
        description: 'Your order has been confirmed and is being prepared.',
        timestamp: new Date('2024-01-25T18:00:00Z'),
        location: 'Delhi, India',
      },
      {
        status: 'processing',
        title: 'Processing',
        description: 'Your order is being prepared for shipment.',
        timestamp: new Date('2024-01-26T10:00:00Z'),
        location: 'Delhi, India',
      },
      {
        status: 'shipped',
        title: 'Shipped',
        description: 'Your order has been shipped and is on its way.',
        timestamp: new Date('2024-01-27T14:00:00Z'),
        location: 'Delhi, India',
      },
      {
        status: 'in_transit',
        title: 'In Transit',
        description: 'Your package is currently in transit to your address.',
        timestamp: new Date('2024-01-28T09:00:00Z'),
        location: 'Delhi, India',
      },
    ],
    metadata: {
      source: 'website',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      ipAddress: '192.168.1.2',
      referrer: 'https://o2nutrition.com/cart',
    },
  },
]

async function seedOrders() {
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db()
    const ordersCollection = db.collection('orders')

    // Clear existing orders
    await ordersCollection.deleteMany({})
    console.log('Cleared existing orders')

    // Insert sample orders
    const result = await ordersCollection.insertMany(sampleOrders)
    console.log(`Inserted ${result.insertedCount} sample orders`)

    // Display inserted orders
    const orders = await ordersCollection.find({}).toArray()
    console.log('\nSample orders created:')
    orders.forEach((order) => {
      console.log(
        `- ${order.orderNumber}: ${order.customerName.firstName} ${order.customerName.lastName} (${order.status})`,
      )
    })

    await client.close()
    console.log('\nDatabase connection closed')
  } catch (error) {
    console.error('Error seeding orders:', error)
    process.exit(1)
  }
}

seedOrders()
