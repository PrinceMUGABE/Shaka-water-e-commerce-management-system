import React, { useEffect } from 'react';
import { 
  Home, ShoppingCart, Users, TrendingUp, MessageSquare, 
  FileText, Settings, LogOut, Package, Star 
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();

  // Debug: Log user info whenever it changes
  useEffect(() => {
    console.log('🔍 Sidebar - Current user:', user);
    console.log('🔍 Sidebar - User role:', user?.role);
  }, [user]);

  const adminMenu = [
    { path: '/admin/dashboard', label: t('navigation.dashboard'), icon: Home },
    { path: '/admin/orders', label: t('admin.orders'), icon: ShoppingCart },
    { path: '/admin/customers', label: t('admin.customers'), icon: Users },
    { path: '/admin/analytics', label: t('admin.analytics'), icon: TrendingUp },
    { path: '/admin/feedback', label: t('feedback.title'), icon: MessageSquare },
    { path: '/admin/reports', label: t('admin.reports'), icon: FileText },
    { path: '/admin/profile', label: t('client.profile'), icon: Settings },
  ];

  const clientMenu = [
    { path: '/client/dashboard', label: t('navigation.dashboard'), icon: Home },
    { path: '/client/orders', label: t('client.myOrders'), icon: ShoppingCart },
    { path: '/client/profile', label: t('client.profile'), icon: Package },
    { path: '/client/feedback', label: t('feedback.title'), icon: Star },
  ];

  // Determine menu based on user role
  const menuItems = user?.role === 'admin' ? adminMenu : clientMenu;

  // Debug: Log which menu is being used
  useEffect(() => {
    console.log('📋 Sidebar - Using menu for role:', user?.role);
    console.log('📋 Sidebar - Menu items:', menuItems.length, 'items');
  }, [user?.role, menuItems]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white 
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:inset-auto transition-transform duration-300 ease-in-out
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">CF</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{t('app.name')}</h2>
                <p className="text-blue-200 text-sm">
                  {user?.role === 'admin' ? t('auth.admin') : t('auth.client')}
                </p>
                {/* Debug indicator */}
                <p className="text-xs text-yellow-300 mt-1">
                  🧪 Role: {user?.role || 'undefined'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="px-4 py-3 bg-blue-950 bg-opacity-50">
            <p className="text-xs text-blue-300">Logged in as:</p>
            <p className="text-sm font-medium truncate">{user?.name || 'Guest'}</p>
            <p className="text-xs text-blue-400 truncate">{user?.phone || 'N/A'}</p>
          </div>

          {/* Logout */}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('navigation.logout')}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;