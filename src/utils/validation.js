import { VALIDATION_PATTERNS } from './constants';

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`;
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!VALIDATION_PATTERNS.EMAIL.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required';
  if (!VALIDATION_PATTERNS.PHONE.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (!VALIDATION_PATTERNS.PASSWORD.test(password)) {
    return 'Password must contain at least one letter and one number';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

export const validateLocation = (location) => {
  if (!location) return 'Location is required';
  if (location.length < 5) {
    return 'Please enter a valid location';
  }
  return '';
};

export const validateProduct = (product) => {
  const errors = {};
  
  if (!product.name?.trim()) {
    errors.name = 'Product name is required';
  }
  
  if (!product.price || product.price <= 0) {
    errors.price = 'Valid price is required';
  }
  
  if (!product.stock || product.stock < 0) {
    errors.stock = 'Valid stock quantity is required';
  }
  
  return errors;
};

export const validateOrder = (order) => {
  const errors = {};
  
  if (!order.deliveryAddress?.trim()) {
    errors.deliveryAddress = 'Delivery address is required';
  }
  
  if (!order.phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!VALIDATION_PATTERNS.PHONE.test(order.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  if (!order.paymentMethod) {
    errors.paymentMethod = 'Payment method is required';
  }
  
  return errors;
};

export const validateFeedback = (feedback) => {
  const errors = {};
  
  if (!feedback.rating || feedback.rating < 1 || feedback.rating > 5) {
    errors.rating = 'Please provide a rating';
  }
  
  if (!feedback.comment?.trim()) {
    errors.comment = 'Comment is required';
  } else if (feedback.comment.length < 10) {
    errors.comment = 'Please provide more details in your comment';
  }
  
  return errors;
};

// Combined validation for forms
export const validateForm = (formData, formType) => {
  const errors = {};
  
  switch (formType) {
    case 'login':
      errors.phone = validatePhone(formData.phone);
      errors.password = validatePassword(formData.password);
      break;
      
    case 'signup':
      errors.fullName = validateRequired(formData.fullName, 'Full name');
      errors.phone = validatePhone(formData.phone);
      errors.email = validateEmail(formData.email);
      errors.location = validateLocation(formData.location);
      errors.password = validatePassword(formData.password);
      errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
      break;
      
    case 'resetPassword':
      errors.email = validateEmail(formData.email);
      if (formData.password) {
        errors.password = validatePassword(formData.password);
        errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
      }
      break;
      
    case 'checkout':
      errors.phone = validatePhone(formData.phone);
      errors.deliveryAddress = validateRequired(formData.deliveryAddress, 'Delivery address');
      errors.paymentMethod = validateRequired(formData.paymentMethod, 'Payment method');
      break;
      
    default:
      break;
  }
  
  // Remove empty error messages
  Object.keys(errors).forEach(key => {
    if (!errors[key]) delete errors[key];
  });
  
  return errors;
};