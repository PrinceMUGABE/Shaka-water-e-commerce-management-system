import { useLanguage } from './useLanguage';

export const useTranslation = () => {
  const { t } = useLanguage();
  
  // Helper function for dynamic translations
  const translate = (key, params = {}) => {
    let translation = t(key);
    
    // Replace parameters in the translation string
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{{${param}}}`, params[param]);
    });
    
    return translation;
  };
  
  return { t: translate, translate };
};