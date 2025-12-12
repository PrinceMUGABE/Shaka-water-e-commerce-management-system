import React from 'react';
import { Menu, Bell, Globe, ShoppingCart, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const { cart, setShowCart } = useCart();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center ml-4 lg:ml-0">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SHAKA</span>
              </div> */}
              <span className="ml-3 text-xl font-bold text-gray-800 hidden sm:block">
                {t('app.name')}
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="hidden sm:flex gap-1">
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
            {user?.role === 'client' && (
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:text-blue-600"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            )}

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || 'Guest'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role === 'admin' ? t('auth.admin') : t('auth.client')}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;