
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminLogin from '@/components/AdminLogin';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminDashboardContent } from '@/components/AdminDashboardContent';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-8">
            <SidebarTrigger className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                ConnectHub Admin
              </h1>
              <p className="text-yellow-700 mt-1">Manage all your connection requests and settings</p>
            </div>
          </div>
          <AdminDashboardContent activeView={activeView} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
