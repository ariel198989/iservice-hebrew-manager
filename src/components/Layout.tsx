import { useState } from 'react';
import { Menu, X, User, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Layout({ children, activeView, onViewChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } md:translate-x-0 md:static md:inset-0`}>
        <Sidebar 
          onClose={() => setSidebarOpen(false)} 
          activeView={activeView}
          onViewChange={onViewChange}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="professional-header shadow-lg slide-in-left">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="md:hidden premium-card p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="modern-search hidden sm:block">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="חיפוש..."
                  className="w-80 pr-10 border-0 bg-transparent focus:ring-0 placeholder:text-muted-foreground/70"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="sm" className="premium-card relative">
                <Bell className="h-5 w-5" />
                <div className="notification-badge">3</div>
              </Button>
              <div className="flex items-center gap-2 sm:gap-3 premium-card px-2 sm:px-4 py-2 rounded-xl">
                <Button variant="ghost" size="sm" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
                <div className="text-sm hidden sm:block">
                  <p className="font-semibold">טכנאי מערכת</p>
                  <p className="text-muted-foreground text-xs">אדמין</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 rtl-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}