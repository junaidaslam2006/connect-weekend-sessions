
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
  LayoutDashboard, 
  MessageSquare, 
  Phone, 
  Video, 
  Settings, 
  Shield,
  Users,
  BarChart3
} from 'lucide-react';

interface AdminSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function AdminSidebar({ activeView, onViewChange }: AdminSidebarProps) {
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
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
    <Sidebar className="border-r border-slate-200 bg-white" collapsible="icon">
      <SidebarHeader className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-semibold text-slate-800">
              ConnectHub
            </h2>
            <p className="text-sm text-slate-600">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-medium text-sm px-4 py-2">
            <span className="group-data-[collapsible=icon]:hidden">Management</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onViewChange(item.id)}
                      isActive={isActive}
                      className={`w-full justify-start text-left transition-colors group py-3 px-4 ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-500' 
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                      tooltip={item.title}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isActive ? 'bg-blue-100' : 'bg-slate-100 group-hover:bg-slate-200'
                        }`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-600'}`} />
                        </div>
                        <span className="group-data-[collapsible=icon]:hidden font-medium">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-700 font-medium text-sm px-4 py-2">
            <span className="group-data-[collapsible=icon]:hidden">Settings</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewChange('settings')}
                  isActive={activeView === 'settings'}
                  className={`w-full justify-start text-left transition-colors group py-3 px-4 ${
                    activeView === 'settings' 
                      ? 'bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-500' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  tooltip="Change Password"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      activeView === 'settings' ? 'bg-blue-100' : 'bg-slate-100 group-hover:bg-slate-200'
                    }`}>
                      <Settings className={`w-4 h-4 ${activeView === 'settings' ? 'text-blue-600' : 'text-slate-600'}`} />
                    </div>
                    <span className="group-data-[collapsible=icon]:hidden font-medium">Change Password</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-slate-800">Admin User</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-xs text-slate-600">Online</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
