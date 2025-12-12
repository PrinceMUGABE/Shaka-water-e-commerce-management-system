import React, { useState } from 'react';
import { Menu, X, Globe, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

// Lazy load components
const Hero = React.lazy(() => import('../components/landing/Hero'));
const Products = React.lazy(() => import('../components/landing/Products'));
const FAQ = React.lazy(() => import('../components/landing/FAQ'));
const CartSidebar = React.lazy(() => import('../components/landing/CartSidebar'));
const Footer = React.lazy(() => import('../components/common/Footer'));

const LandingPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const { cart, setShowCart } = useCart();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t('navigation.home'), href: '#home' },
    { label: t('navigation.products'), href: '#products' },
    { label: t('navigation.about'), href: '#about' },
    { label: t('navigation.faq'), href: '#faq' },
    { label: t('navigation.contact'), href: '#contact' }
  ];

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="px-4 py-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SHAKA</span>
              </div>
              {/* <span className="text-xl font-bold text-gray-800">{t('app.name')}</span> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="flex items-center gap-4">
                {/* Language Selector */}
                <div className="flex gap-1">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      language === 'en' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('rw')}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      language === 'rw' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    RW
                  </button>
                </div>

                {/* Cart */}
                <button
                  onClick={() => setShowCart(true)}
                  className="relative p-2 text-gray-700 hover:text-blue-600"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>

                {/* Auth Buttons */}
                {user ? (
                  <Link
                    to={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'}
                    className="btn-primary"
                  >
                    {t('navigation.dashboard')}
                  </Link>
                ) : (
                  <Link to="/login" className="btn-primary">
                    {t('navigation.login')}
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex-1 px-4 py-2 rounded-lg ${
                      language === 'en' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('rw')}
                    className={`flex-1 px-4 py-2 rounded-lg ${
                      language === 'rw' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Kinyarwanda
                  </button>
                </div>
                
                {user ? (
                  <Link
                    to={user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard'}
                    className="block w-full text-center btn-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('navigation.dashboard')}
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full text-center btn-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('navigation.login')}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main>
        <React.Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Hero />
          <Products />
          <FAQ />
          <CartSidebar />
        </React.Suspense>
      </main>

      {/* Footer */}
      <React.Suspense fallback={null}>
        <Footer />
      </React.Suspense>
    </div>
  );
};

export default LandingPage;