import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Search, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const actions = [
  {
    icon: Camera,
    label: 'Scan Object',
    description: 'AI-powered recognition',
    path: '/scan',
    variant: 'scan' as const,
    delay: 0,
  },
  {
    icon: Search,
    label: 'Search',
    description: 'Find by name',
    path: '/search',
    variant: 'category' as const,
    delay: 0.1,
  },
  {
    icon: BookOpen,
    label: 'Categories',
    description: 'Browse library',
    path: '/categories',
    variant: 'category' as const,
    delay: 0.2,
  },
  {
    icon: GraduationCap,
    label: 'Exam Mode',
    description: 'Test prep',
    path: '/exam',
    variant: 'category' as const,
    delay: 0.3,
  },
];

export function QuickActions() {
  return (
    <section className="px-4 py-6">
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: action.delay }}
            >
              <Link to={action.path}>
                <Button
                  variant={action.variant}
                  className={`w-full h-auto flex-col py-5 gap-2 ${
                    action.variant === 'scan' ? 'col-span-2' : ''
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      action.variant === 'scan'
                        ? 'bg-primary-foreground/20'
                        : 'bg-primary/10'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        action.variant === 'scan'
                          ? 'text-primary-foreground'
                          : 'text-primary'
                      }`}
                    />
                  </div>
                  <div className="text-center">
                    <span
                      className={`font-semibold block ${
                        action.variant === 'scan'
                          ? 'text-primary-foreground'
                          : 'text-card-foreground'
                      }`}
                    >
                      {action.label}
                    </span>
                    <span
                      className={`text-xs ${
                        action.variant === 'scan'
                          ? 'text-primary-foreground/80'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {action.description}
                    </span>
                  </div>
                </Button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
