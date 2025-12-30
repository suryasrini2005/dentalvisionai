import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { categories, dentalObjects, getCategoryColor, getCategoryLabel, Category } from '@/data/dentalData';
import { cn } from '@/lib/utils';

export default function CategoriesPage() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') as Category | null;
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>(initialFilter || 'all');

  const filteredObjects = activeFilter === 'all'
    ? dentalObjects
    : dentalObjects.filter((obj) => obj.category === activeFilter);

  return (
    <MobileLayout>
      {/* Header */}
      <header className="gradient-hero pt-12 pb-4 px-4">
        <h1 className="text-xl font-bold text-foreground">Library</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse dental materials, instruments & more
        </p>
      </header>

      {/* Category Filters */}
      <div className="px-4 py-4 sticky top-0 bg-background z-10 border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <FilterChip
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            All ({dentalObjects.length})
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              active={activeFilter === cat.id}
              onClick={() => setActiveFilter(cat.id as Category)}
            >
              {cat.icon} {cat.name} ({cat.count})
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Objects List */}
      <div className="px-4 py-4 space-y-3">
        {filteredObjects.map((object, index) => (
          <motion.div
            key={object.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <Link
              to={`/object/${object.id}`}
              className="block bg-card rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center text-2xl shrink-0">
                  {object.category === 'material' && '🧪'}
                  {object.category === 'instrument' && '🔧'}
                  {object.category === 'tooth' && '🦷'}
                  {object.category === 'equipment' && '⚙️'}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full border inline-block mb-1",
                      getCategoryColor(object.category)
                    )}
                  >
                    {getCategoryLabel(object.category)}
                  </span>
                  <h3 className="font-semibold text-card-foreground text-sm">
                    {object.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {object.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </MobileLayout>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      )}
    >
      {children}
    </button>
  );
}
