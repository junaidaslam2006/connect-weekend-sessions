
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
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-8">
            <SidebarTrigger className="bg-white/80 hover:bg-white text-slate-600 border border-slate-200 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                ConnectHub Admin
              </h1>
              <p className="text-slate-600 mt-1 text-lg">Manage your professional connections and settings</p>
            </div>
          </div>
          <AdminDashboardContent activeView={activeView} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
