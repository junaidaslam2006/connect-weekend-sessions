
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
  Home, 
  MessageSquare, 
  Phone, 
  Video, 
  Settings,
  Shield,
  User
} from 'lucide-react';

interface MainSidebarProps {
  onAdminClick: () => void;
}

export function MainSidebar({ onAdminClick }: MainSidebarProps) {
  const menuItems = [
    {
      title: "Home",
      icon: Home,
      id: "home"
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
    }
  ];

  return (
    <Sidebar className="border-r border-blue-200 bg-white/95 backdrop-blur-sm">
      <SidebarHeader className="p-6 border-b border-blue-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ConnectHub
            </h2>
            <p className="text-sm text-gray-600">Navigation</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-700 font-semibold">
            Services
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      className="w-full justify-start text-left hover:bg-blue-100 transition-colors duration-200 text-gray-700"
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
          <SidebarGroupLabel className="text-blue-700 font-semibold">
            Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onAdminClick}
                  className="w-full justify-start text-left hover:bg-blue-100 transition-colors duration-200 text-gray-700"
                >
                  <Settings className="w-5 h-5" />
                  <span>Admin Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-blue-200">
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
          <User className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-800">User Panel</p>
            <p className="text-xs text-gray-600">Welcome</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
