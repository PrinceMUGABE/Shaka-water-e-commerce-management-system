// /* eslint-disable react-refresh/only-export-components */
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { mockAuth } from '../services/authService';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('crystalflow_user');
//     const token = localStorage.getItem('crystalflow_token');
    
//     if (savedUser && token) {
//       try {
//         setUser(JSON.parse(savedUser));
//       } catch (err) {
//         console.error('Error parsing saved user:', err);
//         localStorage.removeItem('crystalflow_user');
//         localStorage.removeItem('crystalflow_token');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (credentials) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await mockAuth.login(credentials);
      
//       if (response.success) {
//         const { token, user } = response.data;
        
//         localStorage.setItem('crystalflow_token', token);
//         localStorage.setItem('crystalflow_user', JSON.stringify(user));
//         setUser(user);
        
//         return { success: true, user };
//       }
//     } catch (err) {
//       setError(err.message || 'Login failed');
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (userData) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await mockAuth.signup(userData);
      
//       if (response.success) {
//         const { token, user } = response.data;
        
//         localStorage.setItem('crystalflow_token', token);
//         localStorage.setItem('crystalflow_user', JSON.stringify(user));
//         setUser(user);
        
//         return { success: true, user };
//       }
//     } catch (err) {
//       setError(err.message || 'Signup failed');
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('crystalflow_token');
//     localStorage.removeItem('crystalflow_user');
//     setUser(null);
//     setError(null);
//   };

//   const updateUser = (updates) => {
//     const updatedUser = { ...user, ...updates };
//     localStorage.setItem('crystalflow_user', JSON.stringify(updatedUser));
//     setUser(updatedUser);
//   };

//   const resetPassword = async (email) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await mockAuth.resetPassword(email);
//       return response;
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     login,
//     signup,
//     logout,
//     updateUser,
//     resetPassword,
//     isAuthenticated: !!user,
//     hasRole: (role) => user?.role === role
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Export the context itself
// export { AuthContext };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };




import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('📦 Loaded user from localStorage:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // TEST MODE: Login function that accepts user data
  const login = async (userData) => {
    console.log('🔐 AuthContext login called with:', userData);
    
    try {
      // In test mode, just accept any user data
      const userToStore = {
        id: userData.id || `user_${Date.now()}`,
        phone: userData.phone,
        role: userData.role,
        name: userData.name || (userData.role === 'admin' ? 'Test Admin' : 'Test Client'),
        password: userData.password // In production, never store passwords!
      };

      console.log('💾 Storing user:', userToStore);
      
      // Store in state
      setUser(userToStore);
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userToStore));
      
      console.log('✅ User stored successfully in AuthContext');
      
      return { success: true, user: userToStore };
    } catch (error) {
      console.error('❌ Login error in AuthContext:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    console.log('🚪 Logging out user');
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  // Log current user state whenever it changes
  useEffect(() => {
    console.log('👤 Current user in AuthContext:', user);
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};