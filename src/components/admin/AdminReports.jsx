import React from 'react';
import { Download, FileText, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AdminReports = () => {
  const { t } = useLanguage();

  const reportTypes = [
    {
      icon: <FileText className="w-10 h-10" />,
      title: t('reports.sales'),
      description: t('reports.salesDescription')
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: t('reports.customers'),
      description: t('reports.customersDescription')
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: t('reports.performance'),
      description: t('reports.performanceDescription')
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('admin.reports')}</h2>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-5 h-5" />
          {t('admin.exportReport')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {reportTypes.map((report, index) => (
          <button
            key={index}
            className="card p-6 text-left hover:shadow-lg transition-shadow"
          >
            <div className={`w-10 h-10 mb-3 ${
              index === 0 ? 'text-blue-600' :
              index === 1 ? 'text-purple-600' :
              'text-green-600'
            }`}>
              {report.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
            <p className="text-sm text-gray-600">{report.description}</p>
          </button>
        ))}
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">{t('reports.generateCustom')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">{t('reports.reportType')}</label>
            <select className="input-field">
              <option>{t('reports.sales')}</option>
              <option>{t('reports.customers')}</option>
              <option>{t('reports.inventory')}</option>
              <option>{t('reports.financial')}</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">{t('reports.startDate')}</label>
            <input type="date" className="input-field" />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">{t('reports.endDate')}</label>
            <input type="date" className="input-field" />
          </div>
        </div>
        <button className="btn-primary">{t('admin.generateReport')}</button>
      </div>
    </div>
  );
};

export default AdminReports;