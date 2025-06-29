
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-black via-gray-900 to-yellow-900">
        <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-8">
            <SidebarTrigger className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30" />
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                ConnectHub Admin
              </h1>
              <p className="text-yellow-200 mt-1 text-xl font-medium">Manage all your premium connections and settings</p>
            </div>
          </div>
          <AdminDashboardContent activeView={activeView} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
