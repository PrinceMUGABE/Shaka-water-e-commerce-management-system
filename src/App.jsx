// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import { LanguageProvider } from './contexts/LanguageContext';
// import { CartProvider } from './contexts/CartContext';
// import { FullPageLoader } from './components/common/LoardingSpinner';
// import './styles/globals.css';

// // Lazy load pages
// const LandingPage = lazy(() => import('./pages/LandingPage'));
// const Login = lazy(() => import('./components/auth/Login'));
// const Signup = lazy(() => import('./components/auth/Signup'));
// const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
// const AdminPage = lazy(() => import('./pages/AdminPage'));
// const ClientPage = lazy(() => import('./pages/ClientPage'));
// const PrivateRoute = lazy(() => import('./components/common/PrivateRoute'));
// const NotFound = lazy(() => import('./pages/NotFound'));

// function App() {
//   return (
//     <Router>
//       <LanguageProvider>
//         <AuthProvider>
//           <CartProvider>
//             <Suspense fallback={<FullPageLoader />}>
//               <Routes>
//                 {/* Public Routes */}
//                 <Route path="/" element={<LandingPage />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
//                 <Route path="/reset-password" element={<ResetPassword />} />
//                 <Route path="/products" element={<LandingPage />} />
//                 <Route path="/about" element={<LandingPage />} />
//                 <Route path="/faq" element={<LandingPage />} />
//                 <Route path="/contact" element={<LandingPage />} />

//                 {/* Protected Admin Routes */}
//                 <Route path="/admin/*" element={
//                   <PrivateRoute role="admin">
//                     <AdminPage />
//                   </PrivateRoute>
//                 } />

//                 {/* Protected Client Routes */}
//                 <Route path="/client/*" element={
//                   <PrivateRoute role="client">
//                     <ClientPage />
//                   </PrivateRoute>
//                 } />

//                 {/* Checkout Route */}
//                 <Route path="/checkout" element={
//                   <PrivateRoute>
//                     <ClientPage />
//                   </PrivateRoute>
//                 } />

//                 {/* 404 */}
//                 <Route path="/404" element={<NotFound />} />
//                 <Route path="*" element={<Navigate to="/404" replace />} />
//               </Routes>
//             </Suspense>
//           </CartProvider>
//         </AuthProvider>
//       </LanguageProvider>
//     </Router>
//   );
// }

// export default App;













import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { FullPageLoader } from './components/common/LoardingSpinner';
import './styles/globals.css';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const ClientPage = lazy(() => import('./pages/ClientPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<FullPageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/products" element={<LandingPage />} />
                <Route path="/about" element={<LandingPage />} />
                <Route path="/faq" element={<LandingPage />} />
                <Route path="/contact" element={<LandingPage />} />

                {/* Admin Routes - NO AUTH PROTECTION (TEST MODE) */}
                {/* Changed from /admin/dashboard to /admin/* to fix routing issue */}
                <Route path="/admin/*" element={<AdminPage />} />

                {/* Client Routes - NO AUTH PROTECTION (TEST MODE) */}
                {/* Changed from /client/dashboard to /client/* to fix routing issue */}
                <Route path="/client/*" element={<ClientPage />} />

                {/* Checkout Route - NO AUTH PROTECTION (TEST MODE) */}
                <Route path="/checkout" element={<ClientPage />} />

                {/* 404 */}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;