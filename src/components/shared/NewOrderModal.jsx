import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, MapPin, Phone, CreditCard, Check, Plus, Trash2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const NewOrderModal = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    deliveryLocation: '',
    paymentMethod: 'my-number',
    customPhoneNumber: '',
    agreeTerms: false
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errors, setErrors] = useState({});

  const availableProducts = [
    { id: 1, name: t('products.bottle20L'), price: 10000, unit: 'bottle' },
    { id: 2, name: t('products.bottle10L'), price: 6000, unit: 'bottle' },
    { id: 3, name: t('products.bottle5L'), price: 3500, unit: 'bottle' },
    { id: 4, name: t('products.bottle1_5L'), price: 1000, unit: 'bottle' }
  ];

  const addProductRow = () => {
    setSelectedProducts([
      ...selectedProducts,
      { id: Date.now(), productId: '', quantity: 1 }
    ]);
  };

  const removeProductRow = (id) => {
    setSelectedProducts(selectedProducts.filter(item => item.id !== id));
  };

  const updateProduct = (id, field, value) => {
    setSelectedProducts(selectedProducts.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, item) => {
      const product = availableProducts.find(p => p.id === parseInt(item.productId));
      if (product && item.quantity > 0) {
        return total + (product.price * item.quantity);
      }
      return total;
    }, 0);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(078|079|072|073)\d{7}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (selectedProducts.length === 0) {
      newErrors.products = t('errors.addProduct');
    }

    selectedProducts.forEach(item => {
      if (!item.productId) {
        newErrors.products = t('errors.selectProduct');
      }
      if (item.quantity < 1) {
        newErrors.products = t('errors.minQuantity');
      }
    });

    if (!formData.deliveryLocation.trim()) {
      newErrors.deliveryLocation = t('errors.locationRequired');
    } else if (formData.deliveryLocation.trim().length < 10) {
      newErrors.deliveryLocation = t('errors.locationDetail');
    }

    if (formData.paymentMethod === 'other-number') {
      if (!formData.customPhoneNumber) {
        newErrors.phoneNumber = t('errors.phoneRequired');
      } else if (!validatePhoneNumber(formData.customPhoneNumber)) {
        newErrors.phoneNumber = t('errors.invalidPhone');
      }
    }

    if (!formData.agreeTerms) {
      newErrors.terms = t('errors.agreeTerms');
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const orderData = {
        products: selectedProducts.map(item => {
          const product = availableProducts.find(p => p.id === parseInt(item.productId));
          return {
            productId: item.productId,
            productName: product.name,
            quantity: item.quantity,
            price: product.price,
            subtotal: product.price * item.quantity
          };
        }),
        deliveryLocation: formData.deliveryLocation,
        phoneNumber: formData.paymentMethod === 'my-number' ? user?.phone : formData.customPhoneNumber,
        totalAmount: calculateTotal(),
        orderDate: new Date().toISOString()
      };

      onSubmit(orderData);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      deliveryLocation: '',
      paymentMethod: 'my-number',
      customPhoneNumber: '',
      agreeTerms: false
    });
    setSelectedProducts([]);
    setErrors({});
  };

  useEffect(() => {
    if (isOpen && selectedProducts.length === 0) {
      addProductRow();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const total = calculateTotal();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl transform transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{t('orderModal.title')}</h2>
                  <p className="text-blue-100 text-sm">{t('orderModal.subtitle')}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center justify-center transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Products Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  {t('orderModal.selectProducts')}
                </label>
                <button
                  type="button"
                  onClick={addProductRow}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  <Plus className="w-4 h-4" />
                  {t('orderModal.addProduct')}
                </button>
              </div>

              {selectedProducts.map((item, index) => (
                <div key={item.id} className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    <div className="md:col-span-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('orderModal.product')} {index + 1}
                      </label>
                      <select
                        value={item.productId}
                        onChange={(e) => updateProduct(item.id, 'productId', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      >
                        <option value="">{t('orderModal.selectProductPlaceholder')}</option>
                        {availableProducts.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.name} - {product.price.toLocaleString()} {t('common.currency')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('orderModal.quantity')}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateProduct(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('orderModal.subtotal')}
                      </label>
                      <div className="px-4 py-3 bg-green-50 text-green-700 font-bold rounded-lg text-center">
                        {item.productId ? (
                          (availableProducts.find(p => p.id === parseInt(item.productId))?.price * item.quantity).toLocaleString()
                        ) : '0'} {t('common.currency')}
                      </div>
                    </div>

                    <div className="md:col-span-1 flex justify-end">
                      {selectedProducts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProductRow(item.id)}
                          className="w-10 h-10 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg flex items-center justify-center transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {errors.products && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {errors.products}
                </div>
              )}
            </div>

            {/* Total Display */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-800">{t('orderModal.totalAmount')}:</span>
                <span className="text-3xl font-bold text-green-600">
                  {total.toLocaleString()} {t('common.currency')}
                </span>
              </div>
            </div>

            {/* Delivery Location */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                {t('orderModal.deliveryLocation')}
              </label>
              <textarea
                value={formData.deliveryLocation}
                onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                placeholder={t('orderModal.deliveryPlaceholder')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                rows="3"
              />
              {errors.deliveryLocation && (
                <p className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.deliveryLocation}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                {t('orderModal.paymentPhone')}
              </label>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-all bg-white">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="my-number"
                    checked={formData.paymentMethod === 'my-number'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{t('orderModal.useMyNumber')}</div>
                    <div className="text-sm text-gray-600">{user?.phone || t('orderModal.notAvailable')}</div>
                  </div>
                  {formData.paymentMethod === 'my-number' && (
                    <Check className="w-6 h-6 text-blue-600" />
                  )}
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-all bg-white">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="other-number"
                    checked={formData.paymentMethod === 'other-number'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{t('orderModal.useAnotherNumber')}</div>
                    <div className="text-sm text-gray-600">{t('orderModal.enterDifferentNumber')}</div>
                  </div>
                  {formData.paymentMethod === 'other-number' && (
                    <Check className="w-6 h-6 text-blue-600" />
                  )}
                </label>
              </div>

              {formData.paymentMethod === 'other-number' && (
                <div className="mt-4">
                  <input
                    type="tel"
                    value={formData.customPhoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setFormData({ ...formData, customPhoneNumber: value });
                      }
                    }}
                    placeholder="0781234567"
                    maxLength="10"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {t('orderModal.phoneFormat')}
                  </p>
                  {errors.phoneNumber && (
                    <p className="flex items-center gap-2 text-red-600 text-sm mt-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border-2 border-yellow-200">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded mt-0.5"
                />
                <div className="flex-1">
                  <span className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                    {t('orderModal.agreeToTerms')}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">
                    {t('orderModal.termsDescription')}
                  </p>
                </div>
              </label>
              {errors.terms && (
                <p className="flex items-center gap-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                {t('orderModal.placeOrder')} - {total.toLocaleString()} {t('common.currency')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewOrderModal;