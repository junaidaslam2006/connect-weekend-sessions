
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
  Rocket
} from 'lucide-react';

interface MainSidebarProps {
  onAdminClick: () => void;
}

export function MainSidebar({ onAdminClick }: MainSidebarProps) {
  return (
    <Sidebar className="border-r border-white/10 bg-gradient-to-b from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md">
      <SidebarHeader className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl">
            <Shield className="w-7 h-7 text-white" />
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl blur opacity-30 animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
              ConnectHub
            </h2>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
              <p className="text-sm text-white/70">Control Panel</p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-cyan-400 font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Admin Zone
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={onAdminClick}
                  className="w-full justify-start text-left hover:bg-white/10 transition-all duration-300 text-white/90 hover:text-white group border border-transparent hover:border-white/20 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">Admin Dashboard</span>
                  </div>
                  <Rocket className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Welcome User</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-xs text-white/70">Online</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
