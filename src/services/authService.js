/* eslint-disable no-unused-vars */
// Auth service utilities
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const setUserData = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserData = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeUserData = () => {
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  const user = getUserData();
  return !!(token && user);
};

export const hasRole = (role) => {
  const user = getUserData();
  return user?.role === role;
};

export const logout = () => {
  removeAuthToken();
  removeUserData();
};

// Mock data for development
export const mockAuth = {
  login: async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.phone === 'admin' && credentials.password === 'admin123') {
      return {
        success: true,
        data: {
          token: 'mock-jwt-token-admin',
          user: {
            id: '1',
            name: 'Admin User',
            phone: '0788123456',
            email: 'admin@crystalflow.rw',
            role: 'admin',
            location: 'Gasabo, Kigali'
          }
        }
      };
    }
    
    if (credentials.phone === 'client' && credentials.password === 'client123') {
      return {
        success: true,
        data: {
          token: 'mock-jwt-token-client',
          user: {
            id: '2',
            name: 'Jean Mugabo',
            phone: '0788123456',
            email: 'jean@email.com',
            role: 'client',
            location: 'Gasabo, Kigali'
          }
        }
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  signup: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: {
        token: 'mock-jwt-token-new-user',
        user: {
          id: '3',
          name: userData.fullName,
          phone: userData.phone,
          email: userData.email,
          role: 'client',
          location: userData.location
        }
      }
    };
  },
  
  resetPassword: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Reset instructions sent' };
  },
  
  verifyOtp: async (email, otp) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, verified: otp === '123456' };
  },
  
  updatePassword: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Password updated successfully' };
  }
};