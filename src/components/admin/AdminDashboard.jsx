import React from 'react';
import { DollarSign, ShoppingCart, Users, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const AdminDashboard = () => {
  const { t } = useLanguage();
  
  const metrics = [
    {
      title: t('dashboard.totalRevenue'),
      value: '34.3M RWF',
      change: '+12.5%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: t('dashboard.totalOrders'),
      value: '3,460',
      change: '+8.2%',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: t('dashboard.activeCustomers'),
      value: '1,245',
      change: '+15.3%',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: t('dashboard.customerSatisfaction'),
      value: '96%',
      change: '4.8/5.0',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const salesData = [
    { month: 'Jul', revenue: 4500000 },
    { month: 'Aug', revenue: 5200000 },
    { month: 'Sep', revenue: 4800000 },
    { month: 'Oct', revenue: 6100000 },
    { month: 'Nov', revenue: 7200000 },
    { month: 'Dec', revenue: 6800000 }
  ];

  const regionData = [
    { region: 'Gasabo', sales: 12500000 },
    { region: 'Kicukiro', sales: 9800000 },
    { region: 'Nyarugenge', sales: 8200000 },
    { region: 'Rwamagana', sales: 3500000 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${metric.color.split(' ')[0]} rounded-lg`}>
                {metric.icon}
              </div>
              <span className="text-sm font-semibold text-green-600">
                {metric.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('dashboard.revenueGrowth')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M RWF`} />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#93c5fd" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('dashboard.salesByRegion')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M RWF`} />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;