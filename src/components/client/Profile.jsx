import React, { useState } from 'react';
import { User, Phone, MapPin, Mail, Lock, CreditCard, Bell } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const ClientProfile = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Jean Mugabo',
    phone: user?.phone || '+250 788 123 456',
    email: user?.email || 'jean@email.com',
    location: user?.location || 'Gasabo, Kigali',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Update user profile
  };

  const paymentMethods = [
    { id: 1, type: 'MTN Mobile Money', number: '0788 123 456', isDefault: true },
    { id: 2, type: 'Airtel Money', number: '0722 234 567', isDefault: false }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="sticky top-6 space-y-1">
              <button
                onClick={() => setActiveTab('personal')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                  activeTab === 'personal' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                {t('profile.personalInfo')}
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                  activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <Lock className="w-5 h-5" />
                {t('profile.security')}
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                  activeTab === 'payment' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                {t('profile.paymentMethods')}
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                  activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <Bell className="w-5 h-5" />
                {t('profile.notifications')}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-3/4">
            {activeTab === 'personal' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {t('profile.personalInfo')}
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-primary"
                  >
                    {isEditing ? t('common.save') : t('common.edit')}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('auth.fullName')}
                      </label>
                      <div className="flex items-center input-field">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="flex-1 outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('auth.phoneNumber')}
                      </label>
                      <div className="flex items-center input-field">
                        <Phone className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="flex-1 outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center input-field">
                        <Mail className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="flex-1 outline-none bg-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('auth.location')}
                      </label>
                      <div className="flex items-center input-field">
                        <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="flex-1 outline-none bg-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-4 pt-6 border-t">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        {t('common.cancel')}
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                      >
                        {t('common.save')}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {t('profile.paymentMethods')}
                </h2>
                
                <div className="space-y-4 mb-8">
                  {paymentMethods.map(method => (
                    <div key={method.id} className="card p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{method.type}</p>
                          <p className="text-gray-600">{method.number}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          {method.isDefault && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              {t('profile.default')}
                            </span>
                          )}
                          <button className="text-blue-600 hover:text-blue-700">
                            {t('common.edit')}
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            {t('common.remove')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="btn-primary">
                  {t('profile.addPaymentMethod')}
                </button>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {t('profile.security')}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.currentPassword')}
                    </label>
                    <input type="password" className="input-field" />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.newPassword')}
                      </label>
                      <input type="password" className="input-field" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profile.confirmPassword')}
                      </label>
                      <input type="password" className="input-field" />
                    </div>
                  </div>
                  
                  <button className="btn-primary">
                    {t('profile.updatePassword')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;