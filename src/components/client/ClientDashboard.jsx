import React, { useState } from 'react';
import { ShoppingCart, DollarSign, Package, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import NewOrderModal from '../shared/NewOrderModal';

const ClientDashboard = () => {
  const { t } = useLanguage();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const metrics = [
    {
      title: t('dashboard.totalOrders'),
      value: '16',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: t('client.amountSpent'),
      value: '1.44M RWF',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: t('orders.pending'),
      value: '1',
      icon: <Package className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const recentOrders = [
    { id: 'ORD101', product: '20L Bottles', quantity: 5, amount: 50000, status: 'Delivered', date: '2024-12-01' },
    { id: 'ORD102', product: '10L Bottles', quantity: 8, amount: 48000, status: 'Delivered', date: '2024-12-05' },
    { id: 'ORD103', product: '20L Bottles', quantity: 3, amount: 30000, status: 'Processing', date: '2024-12-09' }
  ];

  const handleOrderSubmit = (orderData) => {
    console.log('New Order Submitted:', orderData);
    
    // Here you would typically send the order to your backend
    // For now, we'll just show a success message
    
    setIsOrderModalOpen(false);
    setShowSuccessMessage(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl shadow-lg animate-slide-down">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Order Placed Successfully!</h3>
              <p className="text-green-50">Your order has been received and will be processed shortly.</p>
            </div>
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center mb-4">
              <div className={`p-3 ${metric.color.split(' ')[0]} rounded-lg`}>
                {metric.icon}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Place Order Button */}
      <div className="mb-6">
        <button
          onClick={() => setIsOrderModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all inline-flex items-center gap-3 group"
        >
          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {t('checkout.placeOrder')}
        </button>
      </div>

      {/* Order History */}
      <div className="card">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            {t('client.orderHistory')}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('products.product')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('orders.quantity')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('orders.amount')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('orders.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('orders.orderDate')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.amount.toLocaleString()} RWF</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Modal */}
      <NewOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
};

export default ClientDashboard;