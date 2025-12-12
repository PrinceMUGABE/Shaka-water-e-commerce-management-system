import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  resetPassword: (email) => api.post('/auth/reset-password', { email }),
  verifyOtp: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
  updatePassword: (data) => api.post('/auth/update-password', data),
};

// User services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  updatePassword: (passwordData) => api.put('/users/password', passwordData),
};

// Product services
export const productService = {
  getProducts: (params = {}) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
};

// Order services
export const orderService = {
  getOrders: (params = {}) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  createOrder: (orderData) => api.post('/orders', orderData),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  cancelOrder: (id) => api.delete(`/orders/${id}`),
  getUserOrders: () => api.get('/orders/user'),
};

// Customer services (Admin)
export const customerService = {
  getCustomers: (params = {}) => api.get('/customers', { params }),
  getCustomer: (id) => api.get(`/customers/${id}`),
  updateCustomer: (id, customerData) => api.put(`/customers/${id}`, customerData),
  getCustomerOrders: (id) => api.get(`/customers/${id}/orders`),
  getCustomerStats: (id) => api.get(`/customers/${id}/stats`),
};

// Analytics services
export const analyticsService = {
  getSalesData: (period) => api.get(`/analytics/sales?period=${period}`),
  getRevenueData: (period) => api.get(`/analytics/revenue?period=${period}`),
  getCustomerStats: () => api.get('/analytics/customers'),
  getProductStats: () => api.get('/analytics/products'),
  getOrderStats: () => api.get('/analytics/orders'),
};

// Feedback services
export const feedbackService = {
  getFeedbacks: (params = {}) => api.get('/feedbacks', { params }),
  createFeedback: (feedbackData) => api.post('/feedbacks', feedbackData),
  replyToFeedback: (id, reply) => api.post(`/feedbacks/${id}/reply`, { reply }),
  deleteFeedback: (id) => api.delete(`/feedbacks/${id}`),
};

// Payment services
export const paymentService = {
  initiatePayment: (paymentData) => api.post('/payments/initiate', paymentData),
  verifyPayment: (paymentId) => api.get(`/payments/verify/${paymentId}`),
  getPaymentMethods: () => api.get('/payments/methods'),
  addPaymentMethod: (methodData) => api.post('/payments/methods', methodData),
  removePaymentMethod: (id) => api.delete(`/payments/methods/${id}`),
};

// Report services
export const reportService = {
  generateSalesReport: (params) => api.get('/reports/sales', { params }),
  generateCustomerReport: (params) => api.get('/reports/customers', { params }),
  generateInventoryReport: (params) => api.get('/reports/inventory', { params }),
  exportReport: (reportId) => api.get(`/reports/export/${reportId}`),
};

// Upload service
export const uploadService = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append('document', file);
    return api.post('/upload/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;