// Format currency
export const formatCurrency = (amount, currency = 'RWF') => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('RWF', currency);
};

// Format date
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
};

// Format date and time
export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Calculate time ago
export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? '1 year ago' : `${interval} years ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? '1 month ago' : `${interval} months ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? '1 day ago' : `${interval} days ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
  }
  
  return seconds < 10 ? 'just now' : `${Math.floor(seconds)} seconds ago`;
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Generate order ID
export const generateOrderId = () => {
  const prefix = 'ORD';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// Calculate cart totals
export const calculateCartTotals = (cartItems, deliveryFee = 2000) => {
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;
  
  return {
    subtotal,
    deliveryFee: subtotal > 0 ? deliveryFee : 0,
    total,
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
  };
};

// Validate phone number
export const isValidPhone = (phone) => {
  const regex = /^(\+250|250|0)?(7[2-8])[0-9]{7}$/;
  return regex.test(phone.replace(/\s+/g, ''));
};

// Format phone number
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('250')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+250${cleaned.slice(1)}`;
  } else if (cleaned.startsWith('7')) {
    return `+250${cleaned}`;
  }
  
  return phone;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Generate random color
export const getRandomColor = () => {
  const colors = [
    '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444',
    '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#06b6d4'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Download file
export const downloadFile = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

// Get user initials
export const getUserInitials = (name) => {
  if (!name) return '?';
  
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Safe parse JSON
export const safeParseJSON = (str, defaultValue = {}) => {
  try {
    return JSON.parse(str) || defaultValue;
  } catch {
    return defaultValue;
  }
};

// Generate mock data for charts
export const generateMockChartData = (type = 'monthly', count = 6) => {
  const data = [];
  const now = new Date();
  
  if (type === 'monthly') {
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toLocaleString('default', { month: 'short' });
      
      data.push({
        month,
        revenue: Math.floor(Math.random() * 5000000) + 2000000,
        orders: Math.floor(Math.random() * 500) + 200,
        customers: Math.floor(Math.random() * 200) + 50
      });
    }
  } else if (type === 'weekly') {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let i = 0; i < 7; i++) {
      data.push({
        day: days[i],
        revenue: Math.floor(Math.random() * 1000000) + 500000,
        orders: Math.floor(Math.random() * 100) + 50
      });
    }
  }
  
  return data;
};