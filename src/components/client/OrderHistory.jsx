import React, { useState } from 'react';
import { Search, Filter, Package, CheckCircle, Clock, Truck } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const OrderHistory = () => {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: 'ORD101',
      product: '20L Bottles',
      quantity: 5,
      amount: 50000,
      status: 'delivered',
      date: '2024-12-01',
      items: [
        { name: '20L Bottle', quantity: 5, price: 10000 }
      ]
    },
    {
      id: 'ORD102',
      product: '10L Bottles',
      quantity: 8,
      amount: 48000,
      status: 'processing',
      date: '2024-12-05',
      items: [
        { name: '10L Bottle', quantity: 8, price: 6000 }
      ]
    },
    {
      id: 'ORD103',
      product: '20L Bottles',
      quantity: 3,
      amount: 30000,
      status: 'pending',
      date: '2024-12-09',
      items: [
        { name: '20L Bottle', quantity: 3, price: 10000 }
      ]
    }
  ];

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const statusIcons = {
    pending: Clock,
    processing: Package,
    delivered: CheckCircle,
    outForDelivery: Truck
  };

  const statusColors = {
    pending: 'text-yellow-600 bg-yellow-100',
    processing: 'text-blue-600 bg-blue-100',
    delivered: 'text-green-600 bg-green-100',
    outForDelivery: 'text-purple-600 bg-purple-100'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('client.myOrders')}</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search')}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('common.all')}</option>
            <option value="pending">{t('orders.pending')}</option>
            <option value="processing">{t('orders.processing')}</option>
            <option value="delivered">{t('orders.delivered')}</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map(order => {
          const StatusIcon = statusIcons[order.status] || Package;
          
          return (
            <div key={order.id} className="card p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${statusColors[order.status].split(' ')[1]}`}>
                      <StatusIcon className={`w-5 h-5 ${statusColors[order.status].split(' ')[0]}`} />
                    </div>
                    <h3 className="font-semibold text-lg">{order.id}</h3>
                  </div>
                  <p className="text-gray-600">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">
                    {order.amount.toLocaleString()} RWF
                  </p>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                    {t(`orders.${order.status}`)}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">{t('orders.orderDetails')}</h4>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.price.toLocaleString()} RWF</p>
                        <p className="text-sm text-gray-600">
                          Total: {(item.quantity * item.price).toLocaleString()} RWF
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6 pt-6 border-t">
                <button className="btn-secondary flex-1">
                  {t('orders.viewDetails')}
                </button>
                {order.status === 'delivered' && (
                  <button className="btn-primary flex-1">
                    {t('feedback.writeReview')}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;