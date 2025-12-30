import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { dentalObjects, getCategoryColor, getCategoryLabel } from '@/data/dentalData';
import { cn } from '@/lib/utils';

export function RecentScans() {
  // Show first 4 items as "recent" for demo
  const recentItems = dentalObjects.slice(0, 4);

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recently Viewed</h2>
        <Link
          to="/categories"
          className="text-sm text-primary font-medium flex items-center gap-1"
        >
          View all <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {recentItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/object/${item.id}`}
              className="block w-36 shrink-0"
            >
              <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <span className="text-4xl">
                    {item.category === 'material' && '🧪'}
                    {item.category === 'instrument' && '🔧'}
                    {item.category === 'tooth' && '🦷'}
                    {item.category === 'equipment' && '⚙️'}
                  </span>
                </div>
                <div className="p-3">
                  <span
                    className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full border mb-1.5 inline-block",
                      getCategoryColor(item.category)
                    )}
                  >
                    {getCategoryLabel(item.category)}
                  </span>
                  <h3 className="text-sm font-medium text-card-foreground line-clamp-2">
                    {item.name}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
