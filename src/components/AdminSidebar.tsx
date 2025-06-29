
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
  Crown
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
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Messages", 
      icon: MessageSquare,
      id: "messages",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Phone Calls",
      icon: Phone, 
      id: "phone",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Video Calls",
      icon: Video,
      id: "video",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Analytics",
      icon: BarChart3,
      id: "analytics",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <Sidebar className="border-r border-white/10 bg-gradient-to-b from-yellow-900/95 via-orange-900/95 to-red-900/95 backdrop-blur-md" collapsible="icon">
      <SidebarHeader className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-2xl">
            <Shield className="w-7 h-7 text-white" />
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl blur opacity-30 animate-pulse"></div>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
              ConnectHub
            </h2>
            <div className="flex items-center gap-1">
              <Crown className="w-3 h-3 text-yellow-400 animate-bounce" />
              <p className="text-sm text-white/70">Admin Panel</p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-yellow-400 font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4 animate-pulse" />
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
                      className={`w-full justify-start text-left transition-all duration-300 group border border-transparent hover:border-white/20 rounded-lg backdrop-blur-sm ${
                        isActive 
                          ? 'bg-gradient-to-r from-white/20 to-white/10 text-white font-medium shadow-lg border-white/30' 
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      tooltip={item.title}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${isActive ? 'shadow-lg' : ''}`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="group-data-[collapsible=icon]:hidden font-medium">{item.title}</span>
                      </div>
                      {isActive && <Sparkles className="w-4 h-4 ml-auto text-yellow-400 animate-spin group-data-[collapsible=icon]:hidden" />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-yellow-400 font-semibold flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="group-data-[collapsible=icon]:hidden">Configuration</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewChange('settings')}
                  isActive={activeView === 'settings'}
                  className={`w-full justify-start text-left transition-all duration-300 group border border-transparent hover:border-white/20 rounded-lg backdrop-blur-sm ${
                    activeView === 'settings' 
                      ? 'bg-gradient-to-r from-white/20 to-white/10 text-white font-medium shadow-lg border-white/30' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  tooltip="Change Password"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-slate-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    <span className="group-data-[collapsible=icon]:hidden font-medium">Change Password</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-white/20 backdrop-blur-sm">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-white">Admin User</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-xs text-white/70">Connected</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
