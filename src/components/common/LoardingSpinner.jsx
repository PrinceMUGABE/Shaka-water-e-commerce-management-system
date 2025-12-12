import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LoadingSpinner = ({ type = 'default', size = 'md', text }) => {
  const { t } = useLanguage();

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const displayText = text || t('loading.default');

  if (type === 'page') {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div className="text-center">
          <div className={`${sizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4`}></div>
          <p className="text-gray-600">{displayText}</p>
        </div>
      </div>
    );
  }

  if (type === 'button') {
    return (
      <div className="flex items-center justify-center">
        <div className={`${sizes[size]} border-2 border-white border-t-transparent rounded-full animate-spin`}></div>
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className={`${sizes[size]} border-4 border-blue-100 rounded-full`}></div>
        <div className={`${sizes[size]} border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
      </div>
      {displayText && <p className="mt-4 text-gray-600">{displayText}</p>}
    </div>
  );
};

// Full page loading component
export const FullPageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
    <div className="text-center">
      <div className="relative inline-block">
        <div className="w-20 h-20 border-8 border-blue-100 rounded-full"></div>
        <div className="w-20 h-20 border-8 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <div className="mt-6 space-y-2">
        <p className="text-2xl font-bold text-gray-800">CrystalFlow</p>
        <p className="text-gray-600">Loading pure water experience...</p>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;