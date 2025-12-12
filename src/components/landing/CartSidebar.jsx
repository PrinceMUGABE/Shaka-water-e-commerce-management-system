import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { t } = useLanguage();
  const { cart, showCart, setShowCart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const deliveryFee = cartTotal > 0 ? 2000 : 0;
  const totalAmount = cartTotal + deliveryFee;

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setShowCart(false)}
      />

      {/* Sidebar */}
      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-800">{t('navigation.cart')}</h2>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {t('cart.empty')}
                  </h3>
                  <p className="text-gray-600 mb-6">{t('cart.addItems')}</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="btn-primary"
                  >
                    {t('products.continueShopping')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-3xl">{item.image}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                              {item.price.toLocaleString()} RWF {t('products.perUnit')}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-semibold">
                            {(item.price * item.quantity).toLocaleString()} RWF
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('checkout.subtotal')}</span>
                    <span className="font-semibold">{cartTotal.toLocaleString()} RWF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('checkout.deliveryFee')}</span>
                    <span className="font-semibold">{deliveryFee.toLocaleString()} RWF</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>{t('checkout.total')}</span>
                    <span>{totalAmount.toLocaleString()} RWF</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    onClick={() => setShowCart(false)}
                    className="block w-full btn-primary text-center py-3"
                  >
                    {t('checkout.checkout')}
                  </Link>
                  <button
                    onClick={() => setShowCart(false)}
                    className="block w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t('cart.continueShopping')}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  {t('cart.freeDeliveryNote')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;