/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { User, Phone, MapPin, Lock, Eye, EyeOff, Mail, Globe, Package, Droplets, ShieldCheck, Clock, Zap, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Signup = () => {
  const { t } = useTranslation();
  const { setLanguage, language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('auth.errors.requiredField');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('auth.errors.requiredField');
    } else if (!/^\+?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = t('auth.errors.invalidPhone');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('auth.errors.requiredField');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('auth.errors.invalidEmail');
    }
    
    if (!formData.location.trim()) {
      newErrors.location = t('auth.errors.requiredField');
    }
    
    if (!formData.password) {
      newErrors.password = t('auth.errors.requiredField');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.errors.passwordLength');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.passwordsDontMatch');
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = t('auth.errors.agreeTerms');
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '2',
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        role: 'client'
      };

      login(userData);
      navigate('/client/dashboard');
      
    } catch (err) {
      setErrors({
        submit: t('auth.errors.signupFailed')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center p-4 lg:p-8 relative">
      
      {/* Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl hover:bg-white/20 transition-all group z-10"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium hidden sm:inline">Back to Home</span>
      </Link>

      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Benefits & Info (Hidden on mobile) */}
        <div className="hidden lg:flex flex-col justify-center text-white space-y-8 px-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Droplets className="w-8 h-8 text-cyan-300" />
              <h1 className="text-3xl font-bold">{t('app.name')}</h1>
            </div>
            <h2 className="text-5xl font-bold leading-tight">
              Join Our Community
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              {t('auth.createAccount')} and enjoy premium water delivery services.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">{t('auth.signupBenefits')}</h3>
            
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Droplets className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">{t('auth.benefit1')}</h4>
                <p className="text-blue-100 text-sm">{t('auth.benefit1Desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-green-900" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">{t('auth.benefit2')}</h4>
                <p className="text-blue-100 text-sm">{t('auth.benefit2Desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-purple-900" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">{t('auth.benefit3')}</h4>
                <p className="text-blue-100 text-sm">{t('auth.benefit3Desc')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-orange-900" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">{t('auth.benefit4')}</h4>
                <p className="text-blue-100 text-sm">{t('auth.benefit4Desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 w-full max-h-[90vh] overflow-y-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mb-4">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{t('app.name')}</h1>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('auth.signup')}</h2>
            <p className="text-gray-600">{t('auth.createAccount')}</p>
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
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{errors.submit}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.fullName')}
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder={t('auth.fullNamePlaceholder')}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.phoneNumber')}
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder={t('auth.enterPhone')}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="example@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.location')}
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none ${
                      errors.location ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder={t('auth.locationPlaceholder')}
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    }`}
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
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('auth.confirmPassword')}
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">
                  {t('auth.agreeTerms')}{' '}
                  <a href="#terms" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                    {t('auth.termsOfService')}
                  </a>{' '}
                  {t('auth.and')}{' '}
                  <a href="#privacy" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                    {t('auth.privacyPolicy')}
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm mt-2">{errors.agreeTerms}</p>
              )}
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
                  {t('auth.creatingAccount')}
                </>
              ) : (
                t('auth.signup')
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              {t('auth.haveAccount')}{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                {t('auth.login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;