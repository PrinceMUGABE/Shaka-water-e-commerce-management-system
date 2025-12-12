/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import rwTranslations from '../translations/rw.json';

// Create the context
const LanguageContext = createContext();

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(enTranslations);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    setTranslations(language === 'en' ? enTranslations : rwTranslations);
    localStorage.setItem('language', language);
  }, [language]);

  const t = (path) => {
    const keys = path.split('.');
    let value = translations;
    
    for (const key of keys) {
      if (value[key] === undefined) {
        console.warn(`Translation missing for path: ${path}`);
        return path;
      }
      value = value[key];
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Export the context itself for advanced use cases
export { LanguageContext };