import React, { useState } from 'react';
import { Phone, MapPin, CreditCard, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { t } = useLanguage();
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('mtn');

  const deliveryFee = cartTotal > 0 ? 2000 : 0;
  const totalAmount = cartTotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order
    alert(t('checkout.orderSuccess'));
    clearCart();
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Delivery & Payment */}
          <div>
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{t('checkout.deliveryAddress')}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">{t('auth.fullName')}</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Jean Mugabo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t('auth.phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="078XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t('auth.location')}
                  </label>
                  <textarea
                    className="input-field"
                    rows="3"
                    placeholder={t('checkout.addressPlaceholder')}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </form>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">{t('checkout.paymentMethod')}</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'mtn'}
                    onChange={() => setPaymentMethod('mtn')}
                    className="mr-3"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <span className="font-semibold">MTN Mobile Money</span>
                      <p className="text-sm text-gray-600">{t('checkout.mtnDescription')}</p>
                    </div>
                  </div>
                </label>
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'airtel'}
                    onChange={() => setPaymentMethod('airtel')}
                    className="mr-3"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <span className="font-semibold">Airtel Money</span>
                      <p className="text-sm text-gray-600">{t('checkout.airtelDescription')}</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="sticky top-8">
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">{t('checkout.orderSummary')}</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {t('common.quantity')}: {item.quantity} × {item.price.toLocaleString()} RWF
                        </p>
                      </div>
                      <p className="font-semibold">
                        {(item.price * item.quantity).toLocaleString()} RWF
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{t('checkout.subtotal')}:</span>
                    <span>{cartTotal.toLocaleString()} RWF</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('checkout.deliveryFee')}:</span>
                    <span>{deliveryFee.toLocaleString()} RWF</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold border-t pt-2">
                    <span>{t('checkout.total')}:</span>
                    <span>{totalAmount.toLocaleString()} RWF</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone || !formData.address || cart.length === 0}
                  className="w-full btn-primary mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard className="w-5 h-5" />
                  {t('checkout.placeOrder')}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                  {t('checkout.terms')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;