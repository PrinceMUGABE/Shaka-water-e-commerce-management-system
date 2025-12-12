import React from 'react';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const ProductCard = ({ product, onAddToCart }) => {
  const { t } = useLanguage();

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 p-8">
        <div className="text-7xl text-center transform group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </div>
        
        {/* Stock Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
            {t('products.inStock')}: {product.stock}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          
          {/* Features */}
          <div className="space-y-2">
            {product.features?.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {product.price.toLocaleString()} RWF
            </p>
            <p className="text-sm text-gray-500">{t('products.perUnit')}</p>
          </div>
          
          <button
            onClick={onAddToCart}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 group/btn"
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            <span>{t('products.addToCart')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;