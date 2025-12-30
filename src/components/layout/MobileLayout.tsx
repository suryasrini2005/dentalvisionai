import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Camera, Search, BookOpen, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/categories', icon: BookOpen, label: 'Library' },
  { path: '/scan', icon: Camera, label: 'Scan', isMain: true },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function MobileLayout({ children }: MobileLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto">
          <div className="glass-strong mx-4 mb-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                if (item.isMain) {
                  return (
                    <Link key={item.path} to={item.path} className="relative -mt-8">
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center gradient-primary shadow-lg",
                          isActive && "shadow-glow"
                        )}
                      >
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      </motion.div>
                      <span className="text-xs text-muted-foreground mt-1 block text-center">
                        {item.label}
                      </span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-center py-2 px-3"
                  >
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        "p-2 rounded-xl transition-colors",
                        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <span
                      className={cn(
                        "text-xs mt-1 transition-colors",
                        isActive ? "text-primary font-medium" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
