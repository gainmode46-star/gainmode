import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerEmail', 'status', 'total', 'createdAt'],
    group: 'E-commerce',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique order number (e.g., ORD-2024-001)',
      },
    },
    {
      name: 'userId',
      type: 'text',
      required: true,
      admin: {
        description: 'User ID from frontend',
      },
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
      admin: {
        description: 'Customer email address',
      },
    },
    {
      name: 'customerName',
      type: 'group',
      admin: {
        description: 'Customer name information',
      },
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'In Transit', value: 'in_transit' },
        { label: 'Out for Delivery', value: 'out_for_delivery' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Returned', value: 'returned' },
        { label: 'Refunded', value: 'refunded' },
      ],
      admin: {
        description: 'Current order status',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      admin: {
        description: 'Order items',
      },
      fields: [
        {
          name: 'productId',
          type: 'text',
          required: true,
          admin: {
            description: 'Product ID',
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Product name',
          },
        },
        {
          name: 'image',
          type: 'text',
          admin: {
            description: 'Product image URL',
          },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Unit price',
          },
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          admin: {
            description: 'Quantity ordered',
          },
        },
        {
          name: 'variant',
          type: 'text',
          admin: {
            description: 'Product variant (flavor, size, etc.)',
          },
        },
        {
          name: 'weight',
          type: 'text',
          admin: {
            description: 'Product weight/size',
          },
        },
        {
          name: 'isUpsell',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Is this an upsell item?',
          },
        },
        {
          name: 'upsellDiscount',
          type: 'number',
          min: 0,
          max: 100,
          admin: {
            description: 'Upsell discount percentage',
          },
        },
        {
          name: 'originalPrice',
          type: 'number',
          min: 0,
          admin: {
            description: 'Original price before discount',
          },
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      required: true,
      admin: {
        description: 'Order pricing breakdown',
      },
      fields: [
        {
          name: 'subtotal',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Subtotal before discounts and shipping',
          },
        },
        {
          name: 'discountAmount',
          type: 'number',
          min: 0,
          admin: {
            description: 'Total discount amount',
          },
        },
        {
          name: 'shippingCost',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Shipping cost',
          },
        },
        {
          name: 'taxAmount',
          type: 'number',
          min: 0,
          admin: {
            description: 'Tax amount',
          },
        },
        {
          name: 'total',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Final total amount',
          },
        },
      ],
    },
    {
      name: 'shippingAddress',
      type: 'group',
      required: true,
      admin: {
        description: 'Shipping address information',
      },
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
        },
        {
          name: 'apartment',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'zipCode',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'India',
        },
      ],
    },
    {
      name: 'delivery',
      type: 'group',
      admin: {
        description: 'Delivery information',
      },
      fields: [
        {
          name: 'method',
          type: 'select',
          required: true,
          defaultValue: 'standard',
          options: [
            { label: 'Standard Delivery', value: 'standard' },
            { label: 'Express Delivery', value: 'express' },
            { label: 'Overnight Delivery', value: 'overnight' },
          ],
        },
        {
          name: 'estimatedDelivery',
          type: 'date',
          admin: {
            description: 'Estimated delivery date',
          },
        },
        {
          name: 'actualDelivery',
          type: 'date',
          admin: {
            description: 'Actual delivery date',
          },
        },
        {
          name: 'trackingNumber',
          type: 'text',
          admin: {
            description: 'Shipping tracking number',
          },
        },
        {
          name: 'carrier',
          type: 'text',
          admin: {
            description: 'Shipping carrier (e.g., FedEx, DHL)',
          },
        },
      ],
    },
    {
      name: 'payment',
      type: 'group',
      required: true,
      admin: {
        description: 'Payment information',
      },
      fields: [
        {
          name: 'method',
          type: 'select',
          required: true,
          options: [
            // { label: 'Credit Card', value: 'credit_card' },
            { label: 'Debit Card/Credit Card', value: 'card' },
            { label: 'UPI', value: 'upi' },
            { label: 'Net Banking', value: 'net_banking' },
            { label: 'Cash on Delivery', value: 'cod' },
            { label: 'Wallet', value: 'wallet' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'pending',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Paid', value: 'paid' },
            { label: 'Failed', value: 'failed' },
            { label: 'Refunded', value: 'refunded' },
            { label: 'Partially Refunded', value: 'partially_refunded' },
          ],
        },
        {
          name: 'transactionId',
          type: 'text',
          admin: {
            description: 'Payment gateway transaction ID',
          },
        },
        {
          name: 'paidAt',
          type: 'date',
          admin: {
            description: 'Payment completion date',
          },
        },
      ],
    },
    {
      name: 'coupons',
      type: 'array',
      admin: {
        description: 'Applied coupons and discounts',
      },
      fields: [
        {
          name: 'code',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'discountType',
          type: 'select',
          options: [
            { label: 'Percentage', value: 'percentage' },
            { label: 'Fixed Amount', value: 'fixed' },
            { label: 'Free Shipping', value: 'free_shipping' },
          ],
        },
        {
          name: 'discountValue',
          type: 'number',
          min: 0,
        },
        {
          name: 'discountAmount',
          type: 'number',
          min: 0,
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Order notes or special instructions',
      },
    },
    {
      name: 'timeline',
      type: 'array',
      admin: {
        description: 'Order status timeline',
      },
      fields: [
        {
          name: 'status',
          type: 'select',
          required: true,
          options: [
            { label: 'Order Placed', value: 'order_placed' },
            { label: 'Order Confirmed', value: 'order_confirmed' },
            { label: 'Processing', value: 'processing' },
            { label: 'Shipped', value: 'shipped' },
            { label: 'In Transit', value: 'in_transit' },
            { label: 'Out for Delivery', value: 'out_for_delivery' },
            { label: 'Delivered', value: 'delivered' },
            { label: 'Cancelled', value: 'cancelled' },
            { label: 'Returned', value: 'returned' },
            { label: 'Refunded', value: 'refunded' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'timestamp',
          type: 'date',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          admin: {
            description: 'Location where status change occurred',
          },
        },
      ],
    },
    {
      name: 'metadata',
      type: 'group',
      admin: {
        description: 'Additional order metadata',
      },
      fields: [
        {
          name: 'source',
          type: 'select',
          defaultValue: 'website',
          options: [
            { label: 'Website', value: 'website' },
            { label: 'Mobile App', value: 'mobile_app' },
            { label: 'Phone', value: 'phone' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        {
          name: 'userAgent',
          type: 'text',
          admin: {
            description: 'User agent string',
          },
        },
        {
          name: 'ipAddress',
          type: 'text',
          admin: {
            description: 'Customer IP address',
          },
        },
        {
          name: 'referrer',
          type: 'text',
          admin: {
            description: 'Referrer URL',
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Auto-generate order number if not provided
        if (!data.orderNumber) {
          const timestamp = Date.now()
          const random = Math.random().toString(36).substr(2, 5).toUpperCase()
          data.orderNumber = `ORD-${timestamp}-${random}`
        }

        // Auto-generate estimated delivery date if not provided
        if (!data.delivery?.estimatedDelivery) {
          const deliveryDays = {
            standard: 7,
            express: 3,
            overnight: 1,
          }
          const method = data.delivery?.method || 'standard'
          const days = deliveryDays[method as keyof typeof deliveryDays] || 7
          const estimatedDate = new Date()
          estimatedDate.setDate(estimatedDate.getDate() + days)
          data.delivery.estimatedDelivery = estimatedDate
        }

        // Initialize timeline if not provided
        if (!data.timeline || data.timeline.length === 0) {
          data.timeline = [
            {
              status: 'order_placed',
              title: 'Order Placed',
              description: 'Your order has been successfully placed.',
              timestamp: new Date(),
            },
          ]
        }

        return data
      },
    ],
    afterChange: [
      ({ doc, operation }) => {
        // Update timeline when status changes
        if (operation === 'update' && doc.status) {
          // This would typically trigger a webhook or notification
          console.log(`Order ${doc.orderNumber} status updated to: ${doc.status}`)
        }
      },
    ],
  },
}
