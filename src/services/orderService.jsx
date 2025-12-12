// Order service utilities and mock data
export const mockOrders = {
  // Admin orders
  adminOrders: [
    {
      id: 'ORD101',
      customerId: '1',
      customerName: 'Jean Mugabo',
      customerPhone: '0788123456',
      customerEmail: 'jean@email.com',
      items: [
        { id: '1', name: '20L Premium Bottle', quantity: 5, price: 10000, total: 50000 },
        { id: '2', name: '10L Standard Bottle', quantity: 2, price: 6000, total: 12000 }
      ],
      subtotal: 62000,
      deliveryFee: 2000,
      total: 64000,
      status: 'delivered',
      paymentMethod: 'mtn',
      paymentStatus: 'paid',
      deliveryAddress: 'KG 123 St, Gasabo, Kigali',
      deliveryNotes: 'Call before delivery',
      createdAt: '2024-12-01T10:30:00Z',
      updatedAt: '2024-12-01T14:45:00Z',
      deliveredAt: '2024-12-01T14:45:00Z'
    },
    {
      id: 'ORD102',
      customerId: '2',
      customerName: 'Marie Uwase',
      customerPhone: '0722345678',
      customerEmail: 'marie@email.com',
      items: [
        { id: '1', name: '20L Premium Bottle', quantity: 3, price: 10000, total: 30000 }
      ],
      subtotal: 30000,
      deliveryFee: 2000,
      total: 32000,
      status: 'processing',
      paymentMethod: 'airtel',
      paymentStatus: 'paid',
      deliveryAddress: 'KG 456 St, Kicukiro, Kigali',
      createdAt: '2024-12-05T09:15:00Z',
      updatedAt: '2024-12-05T09:15:00Z'
    },
    {
      id: 'ORD103',
      customerId: '3',
      customerName: 'Paul Habimana',
      customerPhone: '0788987654',
      customerEmail: 'paul@email.com',
      items: [
        { id: '3', name: '5L Portable Bottle', quantity: 4, price: 3500, total: 14000 },
        { id: '4', name: '1.5L Personal Bottle', quantity: 6, price: 1000, total: 6000 }
      ],
      subtotal: 20000,
      deliveryFee: 2000,
      total: 22000,
      status: 'pending',
      paymentMethod: 'mtn',
      paymentStatus: 'pending',
      deliveryAddress: 'KG 789 St, Nyarugenge, Kigali',
      createdAt: '2024-12-09T14:20:00Z',
      updatedAt: '2024-12-09T14:20:00Z'
    }
  ],
  
  // Client orders
  clientOrders: [
    {
      id: 'ORD101',
      items: [
        { id: '1', name: '20L Premium Bottle', quantity: 5, price: 10000, total: 50000 }
      ],
      subtotal: 50000,
      deliveryFee: 2000,
      total: 52000,
      status: 'delivered',
      paymentMethod: 'mtn',
      paymentStatus: 'paid',
      deliveryAddress: 'KG 123 St, Gasabo, Kigali',
      createdAt: '2024-12-01T10:30:00Z',
      deliveredAt: '2024-12-01T14:45:00Z'
    },
    {
      id: 'ORD102',
      items: [
        { id: '2', name: '10L Standard Bottle', quantity: 8, price: 6000, total: 48000 }
      ],
      subtotal: 48000,
      deliveryFee: 2000,
      total: 50000,
      status: 'delivered',
      paymentMethod: 'airtel',
      paymentStatus: 'paid',
      deliveryAddress: 'KG 123 St, Gasabo, Kigali',
      createdAt: '2024-12-05T09:15:00Z',
      deliveredAt: '2024-12-05T13:30:00Z'
    },
    {
      id: 'ORD103',
      items: [
        { id: '1', name: '20L Premium Bottle', quantity: 3, price: 10000, total: 30000 }
      ],
      subtotal: 30000,
      deliveryFee: 2000,
      total: 32000,
      status: 'processing',
      paymentMethod: 'mtn',
      paymentStatus: 'paid',
      deliveryAddress: 'KG 123 St, Gasabo, Kigali',
      createdAt: '2024-12-09T14:20:00Z'
    }
  ]
};

export const orderService = {
  // Mock API methods
  getOrders: async (role = 'client') => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return role === 'admin' ? mockOrders.adminOrders : mockOrders.clientOrders;
  },
  
  getOrder: async (id, role = 'client') => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const orders = role === 'admin' ? mockOrders.adminOrders : mockOrders.clientOrders;
    return orders.find(order => order.id === id) || null;
  },
  
  createOrder: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newOrder = {
      id: `ORD${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...orderData,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (orderData.role === 'admin') {
      mockOrders.adminOrders.unshift(newOrder);
    } else {
      mockOrders.clientOrders.unshift(newOrder);
    }
    
    return newOrder;
  },
  
  updateOrderStatus: async (id, status) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update in both admin and client arrays for simplicity
    [mockOrders.adminOrders, mockOrders.clientOrders].forEach(orders => {
      const order = orders.find(o => o.id === id);
      if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
        if (status === 'delivered') {
          order.deliveredAt = new Date().toISOString();
        }
      }
    });
    
    return { success: true };
  },
  
  cancelOrder: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove from both arrays
    mockOrders.adminOrders = mockOrders.adminOrders.filter(o => o.id !== id);
    mockOrders.clientOrders = mockOrders.clientOrders.filter(o => o.id !== id);
    
    return { success: true };
  }
};

// Order status utilities
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled'
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ORDER_STATUS.PROCESSING]: 'bg-blue-100 text-blue-800',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'bg-purple-100 text-purple-800',
  [ORDER_STATUS.DELIVERED]: 'bg-green-100 text-green-800',
  [ORDER_STATUS.CANCELLED]: 'bg-red-100 text-red-800'
};

// Payment status utilities
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: 'Pending',
  [PAYMENT_STATUS.PAID]: 'Paid',
  [PAYMENT_STATUS.FAILED]: 'Failed',
  [PAYMENT_STATUS.REFUNDED]: 'Refunded'
};

export const calculateOrderTotal = (items, deliveryFee = 2000) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return {
    subtotal,
    deliveryFee: subtotal > 0 ? deliveryFee : 0,
    total: subtotal > 0 ? subtotal + deliveryFee : 0
  };
};