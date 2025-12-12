import React from 'react';
import { Package, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    company: [
      { label: t('footer.about'), href: '#about' },
      { label: t('footer.careers'), href: '#careers' },
      { label: t('footer.press'), href: '#press' },
      { label: t('footer.blog'), href: '#blog' }
    ],
    services: [
      { label: t('footer.delivery'), href: '#delivery' },
      { label: t('footer.subscription'), href: '#subscription' },
      { label: t('footer.business'), href: '#business' },
      { label: t('footer.institutions'), href: '#institutions' }
    ],
    support: [
      { label: t('footer.helpCenter'), href: '#help' },
      { label: t('footer.contact'), href: '#contact' },
      { label: t('footer.privacy'), href: '#privacy' },
      { label: t('footer.terms'), href: '#terms' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Globe, href: '#', label: 'Website' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-8 h-8" />
              <span className="text-2xl font-bold">{t('app.name')}</span>
            </div>
            <p className="text-gray-400 mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h3 className="font-bold text-lg mb-4">
                {t(`footer.sections.${key}`)}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.contactUs')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+250 788 123 456</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>crystalwater@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>KG 123 St, Gasabo, Kigali, Rwanda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {t('app.name')}. {t('footer.rights')}
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{t('footer.acceptedPayments')}</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-gray-800 rounded text-sm">MTN</span>
                  <span className="px-3 py-1 bg-gray-800 rounded text-sm">Airtel</span>
                  <span className="px-3 py-1 bg-gray-800 rounded text-sm">Visa</span>
                </div>
              </div>
              
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t('footer.backToTop')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;