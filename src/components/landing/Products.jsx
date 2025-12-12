import React, { useState } from 'react';
import { ShoppingCart, Filter, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import ProductCard from '../shared/ProductCard';

const Products = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: '20L Premium Bottle',
      category: 'large',
      price: 10000,
      image: '💧',
      description: t('products.descriptions.large'),
      stock: 50,
      features: ['BPA Free', 'Reusable', 'Durable']
    },
    {
      id: 2,
      name: '10L Standard Bottle',
      category: 'medium',
      price: 6000,
      image: '💦',
      description: t('products.descriptions.medium'),
      stock: 80,
      features: ['Lightweight', 'Easy to Carry', 'BPA Free']
    },
    {
      id: 3,
      name: '5L Portable Bottle',
      category: 'small',
      price: 3500,
      image: '🌊',
      description: t('products.descriptions.small'),
      stock: 100,
      features: ['Compact', 'Portable', 'Travel Friendly']
    },
    {
      id: 4,
      name: '1.5L Personal Bottle',
      category: 'personal',
      price: 1000,
      image: '💧',
      description: t('products.descriptions.personal'),
      stock: 200,
      features: ['Personal Use', 'Compact', 'Affordable']
    }
  ];

  const categories = [
    { id: 'all', name: t('products.categories.all') },
    { id: 'large', name: t('products.categories.large') },
    { id: 'medium', name: t('products.categories.medium') },
    { id: 'small', name: t('products.categories.small') },
    { id: 'personal', name: t('products.categories.personal') }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('products.ourProducts')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('products.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💧</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t('products.noProducts')}
            </h3>
            <p className="text-gray-600">{t('products.tryDifferent')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;