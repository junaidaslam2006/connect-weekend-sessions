
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter
} from '@/components/ui/sidebar';
import { 
  Dashboard, 
  MessageSquare, 
  Phone, 
  Video, 
  Settings, 
  Shield,
  BarChart3,
  Users,
  Lock
} from 'lucide-react';

interface AdminSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function AdminSidebar({ activeView, onViewChange }: AdminSidebarProps) {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Dashboard,
      id: "dashboard"
    },
    {
      title: "Messages", 
      icon: MessageSquare,
      id: "messages"
    },
    {
      title: "Phone Calls",
      icon: Phone, 
      id: "phone"
    },
    {
      title: "Video Calls",
      icon: Video,
      id: "video"
    },
    {
      title: "Analytics",
      icon: BarChart3,
      id: "analytics"
    }
  ];

  return (
    <Sidebar className="border-r-2 border-yellow-200 bg-gradient-to-b from-yellow-50 to-amber-50">
      <SidebarHeader className="p-6 border-b-2 border-yellow-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              ConnectHub
            </h2>
            <p className="text-sm text-gray-600">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-yellow-700 font-semibold">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onViewChange(item.id)}
                      isActive={activeView === item.id}
                      className={`w-full justify-start text-left hover:bg-yellow-100 transition-colors duration-200 ${
                        activeView === item.id 
                          ? 'bg-gradient-to-r from-yellow-200 to-amber-200 text-yellow-800 font-medium' 
                          : 'text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-yellow-700 font-semibold">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewChange('settings')}
                  isActive={activeView === 'settings'}
                  className={`w-full justify-start text-left hover:bg-yellow-100 transition-colors duration-200 ${
                    activeView === 'settings' 
                      ? 'bg-gradient-to-r from-yellow-200 to-amber-200 text-yellow-800 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Change Password</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t-2 border-yellow-200">
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg">
          <Users className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-600">Logged in</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
