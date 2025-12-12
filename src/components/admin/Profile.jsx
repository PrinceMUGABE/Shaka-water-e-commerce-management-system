import React, { useState } from 'react';
import { User, Phone, MapPin, Mail, Camera } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const AdminProfile = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Admin User',
    phone: user?.phone || '+250 788 123 456',
    email: user?.email || 'admin@crystalflow.rw',
    location: user?.location || 'Gasabo, Kigali',
    department: 'Administration'
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
    // In a real app, you would update the user profile via API
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="w-20 h-20 text-white" />
            </div>
            {isEditing && (
              <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                <p className="text-gray-600">{formData.department}</p>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;