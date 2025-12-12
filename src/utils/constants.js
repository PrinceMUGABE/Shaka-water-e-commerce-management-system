// Application constants
export const APP_CONSTANTS = {
  APP_NAME: 'CrystalFlow',
  APP_TAGLINE_EN: 'Pure Water Delivered to Your Doorstep',
  APP_TAGLINE_RW: 'Amazi Meza Agarukira Ku Muryango Wawe',
  CONTACT_PHONE: '+250 788 123 456',
  CONTACT_EMAIL: 'info@crystalflow.rw',
  ADDRESS: 'KG 123 St, Gasabo, Kigali, Rwanda',
  BUSINESS_HOURS: {
    EN: 'Monday - Sunday: 7:00 AM - 8:00 PM',
    RW: 'Ku cyumweru - Ku wa gatandatu: Saa moya - Saa mbiri'
  }
};

// Product constants
export const PRODUCTS = {
  CATEGORIES: [
    { id: 'large', name: '20L Bottles', minPrice: 10000, maxPrice: 15000 },
    { id: 'medium', name: '10L Bottles', minPrice: 6000, maxPrice: 8000 },
    { id: 'small', name: '5L Bottles', minPrice: 3500, maxPrice: 5000 },
    { id: 'personal', name: '1.5L Bottles', minPrice: 1000, maxPrice: 1500 }
  ],
  
  DEFAULT_DELIVERY_FEE: 2000,
  FREE_DELIVERY_THRESHOLD: 20000,
  
  PAYMENT_METHODS: [
    { id: 'mtn', name: 'MTN Mobile Money', icon: '📱', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'airtel', name: 'Airtel Money', icon: '📱', color: 'bg-red-100 text-red-800' },
    { id: 'cash', name: 'Cash on Delivery', icon: '💰', color: 'bg-green-100 text-green-800' }
  ]
};

// Order constants
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_DISPLAY = {
  [ORDER_STATUS.PENDING]: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  [ORDER_STATUS.PROCESSING]: { label: 'Processing', color: 'bg-blue-100 text-blue-800' },
  [ORDER_STATUS.OUT_FOR_DELIVERY]: { label: 'Out for Delivery', color: 'bg-purple-100 text-purple-800' },
  [ORDER_STATUS.DELIVERED]: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
  [ORDER_STATUS.CANCELLED]: { label: 'Cancelled', color: 'bg-red-100 text-red-800' }
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  DELIVERY_AGENT: 'delivery_agent'
};

// Local storage keys
export const STORAGE_KEYS = {
  USER: 'crystalflow_user',
  TOKEN: 'crystalflow_token',
  CART: 'crystalflow_cart',
  LANGUAGE: 'crystalflow_language',
  THEME: 'crystalflow_theme'
};

// API endpoints (mock for now)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
    RESET_PASSWORD: '/api/auth/reset-password'
  },
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
  CUSTOMERS: '/api/customers',
  ANALYTICS: '/api/analytics',
  FEEDBACK: '/api/feedback',
  REPORTS: '/api/reports'
};

// Validation patterns
export const VALIDATION_PATTERNS = {
  PHONE: /^\+?[\d\s-]{10,}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/
};

// Colors
export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },
  SECONDARY: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  }
};

// Chart colors for analytics
export const CHART_COLORS = {
  REVENUE: '#3b82f6',
  ORDERS: '#10b981',
  CUSTOMERS: '#8b5cf6',
  SALES: '#f59e0b',
  DELIVERED: '#10b981',
  PROCESSING: '#f59e0b',
  PENDING: '#ef4444',
  OUT_FOR_DELIVERY: '#3b82f6'
};