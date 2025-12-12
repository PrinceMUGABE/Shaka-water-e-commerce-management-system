import React from 'react';
import { ArrowRight, Shield, Truck, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('hero.features.purity'),
      description: t('hero.features.purityDesc')
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: t('hero.features.delivery'),
      description: t('hero.features.deliveryDesc')
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t('hero.features.quality'),
      description: t('hero.features.qualityDesc')
    }
  ];

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('app.tagline')}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                {t('products.ourProducts')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/signup"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {t('navigation.signup')}
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-blue-200">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative w-full h-96 lg:h-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl transform -rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-8xl mb-4">💧</div>
                  <h3 className="text-2xl font-bold mb-2">{t('app.name')}</h3>
                  <p className="text-blue-200">{t('hero.slogan')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;