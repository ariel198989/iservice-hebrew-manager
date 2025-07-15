import { useState } from 'react';
import { 
  Home, 
  Users, 
  Phone, 
  Clock, 
  FileText, 
  Settings, 
  Package,
  BarChart3,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onClose?: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  active?: boolean;
}

export function Sidebar({ onClose, activeView, onViewChange }: SidebarProps) {

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'לוח בקרה', icon: Home },
    { id: 'clients', label: 'ניהול לקוחות', icon: Users },
    { id: 'service-calls', label: 'קריאות שירות', icon: Phone },
    { id: 'hour-banks', label: 'בנקי שעות', icon: Clock },
    { id: 'equipment', label: 'ציוד וספקים', icon: Package },
    { id: 'reports', label: 'דוחות', icon: BarChart3 },
    { id: 'invoices', label: 'חשבוניות', icon: FileText },
    { id: 'settings', label: 'הגדרות', icon: Settings }
  ];

  return (
    <div className="h-full glass-sidebar slide-in-right">
      <div className="flex items-center justify-between p-6 border-b border-sidebar-border/50">
        <div className="fade-in-up">
          <h1 className="text-2xl font-bold text-white mb-1">מערכת ניהול שירות</h1>
          <p className="text-sm text-sidebar-foreground/80">ניהול לקוחות ותמיכה מתקדם</p>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-sidebar-foreground hover:bg-sidebar-accent/30 md:hidden rounded-xl transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="p-4 space-y-3">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-4 text-sidebar-foreground hover:bg-sidebar-accent/30 rounded-xl py-3 px-4 transition-all duration-300 modern-sidebar-item stagger-fade-in",
                isActive && "bg-sidebar-accent/50 text-white shadow-lg transform scale-105"
              )}
              onClick={() => onViewChange(item.id)}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {isActive && (
                  <div className="absolute -inset-2 bg-white/20 rounded-full -z-10 animate-pulse"></div>
                )}
              </div>
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
              )}
            </Button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border/50">
        <div className="bg-sidebar-accent/20 rounded-xl p-4 backdrop-blur-sm fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-sidebar-foreground/80 font-medium">גרסה 1.0.0</p>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs text-sidebar-foreground/70">© 2024 מערכת ניהול שירות</p>
        </div>
      </div>
    </div>
  );
}