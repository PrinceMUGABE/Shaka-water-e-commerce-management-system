import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import ClientDashboard from '../components/client/ClientDashboard';
import OrderHistory from '../components/client/OrderHistory';
import ClientProfile from '../components/client/Profile';
import ClientFeedback from '../components/client/ClientFeedback';
import Checkout from '../components/shared/Checkout';

const ClientPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<ClientDashboard />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/profile" element={<ClientProfile />} />
            <Route path="/feedback" element={<ClientFeedback />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ClientPage;