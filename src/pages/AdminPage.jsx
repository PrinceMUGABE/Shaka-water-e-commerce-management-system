import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminAnalytics from '../components/admin/AdminAnalytics';
import AdminReports from '../components/admin/AdminReports';
import CustomerManagement from '../components/admin/CustomerManagement';
import OrderManagement from '../components/admin/OrderManagement';
import AdminFeedback from '../components/admin/AdminFeedbacks';
import AdminProfile from '../components/admin/Profile';

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/analytics" element={<AdminAnalytics />} />
            <Route path="/reports" element={<AdminReports />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/feedback" element={<AdminFeedback />} />
            <Route path="/profile" element={<AdminProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;