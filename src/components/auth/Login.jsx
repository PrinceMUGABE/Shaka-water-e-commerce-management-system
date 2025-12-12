// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import { Phone, Lock, Eye, EyeOff, Globe, Package, Droplets, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
// import { useLanguage } from '../../contexts/LanguageContext';
// import { useAuth } from '../../contexts/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';
// import { useTranslation } from '../../hooks/useTranslation';

// const Login = () => {
//   const { t } = useTranslation();
//   const { setLanguage, language } = useLanguage();
//   const { login } = useAuth();
//   const navigate = useNavigate();
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     phone: '',
//     password: '',
//     role: 'client'
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock user data based on role
//       const userData = {
//         id: '1',
//         name: formData.role === 'admin' ? 'Admin User' : 'Jean Mugabo',
//         phone: formData.phone,
//         role: formData.role,
//         location: 'Gasabo, Kigali',
//         email: formData.role === 'admin' ? 'admin@crystalflow.rw' : 'jean@email.com'
//       };

//       login(userData);
      
//       // Redirect based on role
//       if (formData.role === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/client/dashboard');
//       }
//     } catch (err) {
//       setError(t('auth.errors.invalidCredentials'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4 lg:p-8 relative">
      
//       {/* Back to Home Button */}
//       <Link
//         to="/"
//         className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl hover:bg-white/20 transition-all group"
//       >
//         <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//         <span className="font-medium hidden sm:inline">Back to Home</span>
//       </Link>

//       <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
//         {/* Left Side - Branding & Info (Hidden on mobile) */}
//         <div className="hidden lg:flex flex-col justify-center text-white space-y-8 px-8">
//           <div className="space-y-4">
//             <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
//               <Droplets className="w-8 h-8 text-cyan-300" />
//               <h1 className="text-3xl font-bold">{t('app.name')}</h1>
//             </div>
//             <h2 className="text-5xl font-bold leading-tight">
//               {t('hero.slogan')}
//             </h2>
//             <p className="text-xl text-blue-100 leading-relaxed">
//               {t('hero.description')}
//             </p>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-1 gap-4">
//             <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
//               <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <ShieldCheck className="w-6 h-6 text-blue-900" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">{t('hero.features.purity')}</h3>
//                 <p className="text-blue-100 text-sm">{t('hero.features.purityDesc')}</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
//               <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <Clock className="w-6 h-6 text-blue-900" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">{t('hero.features.delivery')}</h3>
//                 <p className="text-blue-100 text-sm">{t('hero.features.deliveryDesc')}</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
//               <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <Package className="w-6 h-6 text-blue-900" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg">{t('hero.features.quality')}</h3>
//                 <p className="text-blue-100 text-sm">{t('hero.features.qualityDesc')}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 w-full">
//           {/* Mobile Logo */}
//           <div className="lg:hidden text-center mb-6">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mb-4">
//               <Droplets className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800">{t('app.name')}</h1>
//           </div>

//           {/* Header */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('auth.login')}</h2>
//             <p className="text-gray-600">Welcome back! Please enter your details.</p>
//           </div>

//           {/* Language Switcher */}
//           <div className="mb-6 flex gap-2">
//             <button
//               onClick={() => setLanguage('en')}
//               className={`flex-1 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
//                 language === 'en' 
//                   ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
//                   : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <Globe className="w-4 h-4" />
//               <span className="font-medium">English</span>
//             </button>
//             <button
//               onClick={() => setLanguage('rw')}
//               className={`flex-1 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
//                 language === 'rw' 
//                   ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
//                   : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <Globe className="w-4 h-4" />
//               <span className="font-medium">Kinyarwanda</span>
//             </button>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
//               <p className="text-red-700 text-sm font-medium">{error}</p>
//             </div>
//           )}

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Phone Number */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 {t('auth.phoneNumber')}
//               </label>
//               <div className="relative">
//                 <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
//                   placeholder={t('auth.enterPhone')}
                 
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 {t('auth.password')}
//               </label>
//               <div className="relative">
//                 <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
//                   placeholder="••••••••"
                 
//                   minLength="6"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Role Selection */}
//             <div>
//               <label className="block text-gray-700 font-medium mb-3">
//                 {t('auth.selectRole')}
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setFormData({...formData, role: 'admin'})}
//                   className={`py-4 rounded-xl font-semibold transition-all ${
//                     formData.role === 'admin'
//                       ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 scale-105'
//                       : 'border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
//                   }`}
//                 >
//                   {t('auth.admin')}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setFormData({...formData, role: 'client'})}
//                   className={`py-4 rounded-xl font-semibold transition-all ${
//                     formData.role === 'client'
//                       ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105'
//                       : 'border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
//                   }`}
//                 >
//                   {t('auth.client')}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between pt-2">
//               <label className="flex items-center gap-2 cursor-pointer group">
//                 <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500" />
//                 <span className="text-gray-700 text-sm group-hover:text-gray-900">{t('auth.rememberMe')}</span>
//               </label>
//               <Link
//                 to="/reset-password"
//                 className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
//               >
//                 {t('auth.forgotPassword')}
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   {t('auth.loggingIn')}
//                 </>
//               ) : (
//                 t('auth.login')
//               )}
//             </button>
//           </form>

//           {/* Signup Link */}
//           <div className="text-center mt-8 pt-6 border-t border-gray-200">
//             <p className="text-gray-600">
//               {t('auth.noAccount')}{' '}
//               <Link
//                 to="/signup"
//                 className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
//               >
//                 {t('auth.signup')}
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


















/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, Globe, Package, Droplets, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Login = () => {
  const { t } = useTranslation();
  const { setLanguage, language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    role: 'client'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🚀 Login form submitted');
    console.log('📋 Form data:', formData);

    try {
      // TEST MODE: Create dummy credentials based on selected role
      const dummyCredentials = {
        phone: formData.phone || `+25078${Math.floor(Math.random() * 10000000)}`,
        password: formData.password || 'test123456',
        role: formData.role
      };

      console.log('✅ Dummy credentials created:', dummyCredentials);

      // Try to call login if it exists
      if (login && typeof login === 'function') {
        console.log('🔐 Calling login function...');
        try {
          await login(dummyCredentials);
          console.log('✅ Login function called successfully');
        } catch (loginErr) {
          console.warn('⚠️ Login function error (continuing anyway):', loginErr);
        }
      } else {
        console.warn('⚠️ Login function not available, skipping');
      }

      // Simulate a short delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Navigate based on selected role
      const targetPath = formData.role === 'admin' ? '/admin/dashboard' : '/client/dashboard';
      const userData = {
        phone: dummyCredentials.phone,
        role: formData.role,
        name: formData.role === 'admin' ? 'Test Admin' : 'Test Client'
      };

      console.log('🎯 Navigating to:', targetPath);
      console.log('👤 User data:', userData);

      navigate(targetPath, { 
        state: { user: userData },
        replace: false
      });

      console.log('✅ Navigation called successfully');
      
    } catch (err) {
      console.error('❌ Error in handleSubmit:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      setError(`Navigation failed: ${err.message || 'Unknown error'}. Check console for details.`);
    } finally {
      setLoading(false);
      console.log('🏁 Loading state set to false');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4 lg:p-8 relative">
      
      {/* Test Mode Banner */}
      <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-yellow-900 text-center py-2 px-4 font-semibold text-sm">
        🧪 TEST MODE: No credentials required - Select role and login
      </div>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-16 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl hover:bg-white/20 transition-all group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium hidden sm:inline">Back to Home</span>
      </Link>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center mt-8">
        
        {/* Left Side - Branding & Info (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col justify-center text-white space-y-8 px-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Droplets className="w-8 h-8 text-cyan-300" />
              <h1 className="text-3xl font-bold">{t('app.name')}</h1>
            </div>
            <h2 className="text-5xl font-bold leading-tight">
              {t('hero.slogan')}
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              {t('hero.description')}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('hero.features.purity')}</h3>
                <p className="text-blue-100 text-sm">{t('hero.features.purityDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('hero.features.delivery')}</h3>
                <p className="text-blue-100 text-sm">{t('hero.features.deliveryDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{t('hero.features.quality')}</h3>
                <p className="text-blue-100 text-sm">{t('hero.features.qualityDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mb-4">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{t('app.name')}</h1>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('auth.login')}</h2>
            <p className="text-gray-600">Welcome back! Please enter your details.</p>
            <p className="text-sm text-yellow-600 mt-2">🧪 Test Mode: Credentials optional</p>
          </div>

          {/* Language Switcher */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                language === 'en' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">English</span>
            </button>
            <button
              onClick={() => setLanguage('rw')}
              className={`flex-1 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                language === 'rw' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">Kinyarwanda</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-red-500 text-xl">⚠️</div>
                <div className="flex-1">
                  <p className="text-red-700 text-sm font-medium mb-1">Error occurred:</p>
                  <p className="text-red-600 text-sm">{error}</p>
                  <p className="text-red-500 text-xs mt-2">Check browser console (F12) for detailed logs</p>
                </div>
              </div>
            </div>
          )}

          {/* Debug Info Panel */}
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-blue-700 text-sm font-medium mb-2">🔍 Debug Info:</p>
            <div className="space-y-1 text-xs text-blue-600">
              <p>• Selected Role: <strong>{formData.role}</strong></p>
              <p>• Phone: {formData.phone || '(will be auto-generated)'}</p>
              <p>• Password: {formData.password || '(will use default)'}</p>
              <p>• Navigate function: {navigate ? '✅ Available' : '❌ Not available'}</p>
              <p>• Login function: {login ? '✅ Available' : '❌ Not available'}</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t('auth.phoneNumber')} <span className="text-gray-400 text-sm">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder={t('auth.enterPhone')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {t('auth.password')} <span className="text-gray-400 text-sm">(Optional)</span>
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                {t('auth.selectRole')} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'admin'})}
                  className={`py-4 rounded-xl font-semibold transition-all ${
                    formData.role === 'admin'
                      ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 scale-105'
                      : 'border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  {t('auth.admin')}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'client'})}
                  className={`py-4 rounded-xl font-semibold transition-all ${
                    formData.role === 'client'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {t('auth.client')}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500" />
                <span className="text-gray-700 text-sm group-hover:text-gray-900">{t('auth.rememberMe')}</span>
              </label>
              <Link
                to="/reset-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t('auth.loggingIn')}
                </>
              ) : (
                t('auth.login')
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              {t('auth.noAccount')}{' '}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                {t('auth.signup')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;