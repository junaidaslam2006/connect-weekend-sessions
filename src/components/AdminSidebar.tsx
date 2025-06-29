
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
  BarChart3,
  Sparkles,
  Zap,
  Crown,
  Star
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
      id: "dashboard",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Messages", 
      icon: MessageSquare,
      id: "messages",
      gradient: "from-yellow-400 to-yellow-500"
    },
    {
      title: "Phone Calls",
      icon: Phone, 
      id: "phone",
      gradient: "from-yellow-600 to-yellow-500"
    },
    {
      title: "Video Calls",
      icon: Video,
      id: "video",
      gradient: "from-yellow-500 to-yellow-400"
    },
    {
      title: "Analytics",
      icon: BarChart3,
      id: "analytics",
      gradient: "from-yellow-600 to-yellow-400"
    }
  ];

  return (
    <Sidebar className="border-r border-yellow-500/30 bg-gradient-to-b from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl" collapsible="icon">
      <SidebarHeader className="p-6 border-b border-yellow-500/30">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <Shield className="w-8 h-8 text-black" />
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl blur opacity-30 animate-pulse"></div>
            <Crown className="absolute -top-2 -right-2 w-5 h-5 text-yellow-300 animate-bounce" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              ConnectHub
            </h2>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 animate-bounce" />
              <p className="text-sm text-yellow-200/80 font-medium">Admin Panel</p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-yellow-400 font-bold flex items-center gap-2 text-lg">
            <Zap className="w-5 h-5 animate-pulse" />
            <span className="group-data-[collapsible=icon]:hidden">Control Center</span>
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
                      className={`w-full justify-start text-left transition-all duration-500 group border border-transparent hover:border-yellow-500/30 rounded-xl backdrop-blur-sm py-4 ${
                        isActive 
                          ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 font-bold shadow-lg border-yellow-500/50' 
                          : 'text-yellow-100/80 hover:text-yellow-400 hover:bg-yellow-500/10'
                      }`}
                      tooltip={item.title}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${isActive ? 'shadow-lg' : ''}`}>
                          <Icon className="w-5 h-5 text-black" />
                        </div>
                        <span className="group-data-[collapsible=icon]:hidden font-bold text-lg">{item.title}</span>
                      </div>
                      {isActive && <Sparkles className="w-5 h-5 ml-auto text-yellow-400 animate-spin group-data-[collapsible=icon]:hidden" />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-yellow-400 font-bold flex items-center gap-2 text-lg">
            <Settings className="w-5 h-5" />
            <span className="group-data-[collapsible=icon]:hidden">Configuration</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewChange('settings')}
                  isActive={activeView === 'settings'}
                  className={`w-full justify-start text-left transition-all duration-500 group border border-transparent hover:border-yellow-500/30 rounded-xl backdrop-blur-sm py-4 ${
                    activeView === 'settings' 
                      ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 font-bold shadow-lg border-yellow-500/50' 
                      : 'text-yellow-100/80 hover:text-yellow-400 hover:bg-yellow-500/10'
                  }`}
                  tooltip="Change Password"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Settings className="w-5 h-5 text-black" />
                    </div>
                    <span className="group-data-[collapsible=icon]:hidden font-bold text-lg">Change Password</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-yellow-500/30">
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-2xl border border-yellow-500/30 backdrop-blur-sm">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-black" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-lg font-bold text-yellow-400">Admin User</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <p className="text-sm text-yellow-200/80 font-medium">Connected</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
