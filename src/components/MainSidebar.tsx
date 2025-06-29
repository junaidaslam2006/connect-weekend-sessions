
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
  Settings,
  Shield,
  User,
  Sparkles,
  Zap,
  Crown,
  Star
} from 'lucide-react';

interface MainSidebarProps {
  onAdminClick: () => void;
}

export function MainSidebar({ onAdminClick }: MainSidebarProps) {
  return (
    <Sidebar className="border-r border-yellow-500/30 bg-gradient-to-b from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl">
      <SidebarHeader className="p-6 border-b border-yellow-500/30">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <Shield className="w-8 h-8 text-black" />
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl blur opacity-30 animate-pulse"></div>
            <Crown className="absolute -top-2 -right-2 w-5 h-5 text-yellow-300 animate-bounce" />
          </div>
          <div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              ConnectHub
            </h2>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
              <p className="text-sm text-yellow-200/80 font-medium">Premium Platform</p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-yellow-400 font-bold flex items-center gap-2 text-lg">
            <Zap className="w-5 h-5 animate-pulse" />
            Admin Zone
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onAdminClick}
                  className="w-full justify-start text-left hover:bg-yellow-500/20 transition-all duration-500 text-yellow-100/90 hover:text-yellow-400 group border border-transparent hover:border-yellow-500/30 rounded-xl backdrop-blur-sm py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <Settings className="w-5 h-5 text-black" />
                    </div>
                    <span className="font-bold text-lg">Admin Dashboard</span>
                  </div>
                  <Sparkles className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-yellow-400 animate-spin" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-yellow-500/30">
        <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-2xl border border-yellow-500/30 backdrop-blur-sm hover:bg-yellow-500/20 transition-all duration-500">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-black" />
          </div>
          <div>
            <p className="text-lg font-bold text-yellow-400">Premium User</p>
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
