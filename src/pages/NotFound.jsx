import React from 'react';
import { Home, Search, Frown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-blue-100">404</div>
          <Frown className="w-32 h-32 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {t('notFound.title')}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {t('notFound.description')}
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 btn-primary px-8 py-3"
          >
            <Home className="w-5 h-5" />
            {t('notFound.backHome')}
          </Link>
          
          <div className="text-sm text-gray-500">
            {t('notFound.helpText')}{' '}
            <a href="mailto:support@crystalflow.rw" className="text-blue-600 hover:underline">
              support@crystalflow.rw
            </a>
          </div>
        </div>

        {/* Search suggestions */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            {t('notFound.suggestions')}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/products" className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600">
              {t('navigation.products')}
            </Link>
            <Link to="/faq" className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600">
              {t('navigation.faq')}
            </Link>
            <Link to="/about" className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600">
              {t('navigation.about')}
            </Link>
            <Link to="/contact" className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600">
              {t('navigation.contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;