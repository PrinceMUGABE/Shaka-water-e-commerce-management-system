/* eslint-disable no-unused-vars */
import React from 'react';
import { Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const AdminAnalytics = () => {
  const { t } = useLanguage();

  const salesData = [
    { month: 'Jan', revenue: 3200000, orders: 320 },
    { month: 'Feb', revenue: 3800000, orders: 380 },
    { month: 'Mar', revenue: 4200000, orders: 420 },
    { month: 'Apr', revenue: 4500000, orders: 450 },
    { month: 'May', revenue: 5200000, orders: 520 },
    { month: 'Jun', revenue: 6100000, orders: 610 },
  ];

  const pieData = [
    { name: t('orders.delivered'), value: 65, color: '#10b981' },
    { name: t('orders.processing'), value: 20, color: '#f59e0b' },
    { name: t('orders.outForDelivery'), value: 10, color: '#3b82f6' },
    { name: t('orders.pending'), value: 5, color: '#ef4444' }
  ];

  const topProducts = [
    { id: 1, name: '20L Bottles', sold: 500, revenue: 5000000 },
    { id: 2, name: '10L Bottles', sold: 400, revenue: 2400000 },
    { id: 3, name: '5L Bottles', sold: 300, revenue: 1050000 },
    { id: 4, name: '1.5L Bottles', sold: 200, revenue: 200000 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('admin.analytics')}</h2>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-4 h-4" />
          {t('admin.exportReport')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('dashboard.monthlySales')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={2} 
                name="Revenue" 
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                name="Orders" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('orders.orderStatus')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {t('dashboard.topProducts')}
        </h3>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="text-3xl">💧</div>
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.revenue.toLocaleString()} RWF</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-blue-600">{product.sold} sold</p>
                <p className="text-sm text-gray-600">{product.revenue.toLocaleString()} RWF</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;