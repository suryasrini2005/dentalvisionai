import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { dentalObjects, getCategoryColor, getCategoryLabel } from '@/data/dentalData';
import { cn } from '@/lib/utils';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredObjects = query.length > 0
    ? dentalObjects.filter((obj) =>
        obj.name.toLowerCase().includes(query.toLowerCase()) ||
        obj.description.toLowerCase().includes(query.toLowerCase()) ||
        obj.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const recentSearches = ['Glass Ionomer', 'Composite', 'Explorer', 'Handpiece'];

  return (
    <MobileLayout>
      {/* Header */}
      <header className="gradient-hero pt-12 pb-4 px-4">
        <h1 className="text-xl font-bold text-foreground">Search</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Find dental objects by name
        </p>
      </header>

      {/* Search Input */}
      <div className="px-4 py-4 sticky top-0 bg-background z-10 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search materials, instruments, teeth..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 h-12 rounded-xl bg-muted border-0"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {query.length === 0 ? (
          <>
            {/* Recent Searches */}
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-foreground mb-3">
                Recent Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular */}
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-3">
                Popular Topics
              </h2>
              <div className="space-y-2">
                {dentalObjects.slice(0, 3).map((object) => (
                  <Link
                    key={object.id}
                    to={`/object/${object.id}`}
                    className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-primary/30 transition-all"
                  >
                    <span className="text-2xl">
                      {object.category === 'material' && '🧪'}
                      {object.category === 'instrument' && '🔧'}
                      {object.category === 'tooth' && '🦷'}
                      {object.category === 'equipment' && '⚙️'}
                    </span>
                    <div>
                      <h3 className="font-medium text-card-foreground text-sm">
                        {object.name}
                      </h3>
                      <p className="text-xs text-muted-foreground capitalize">
                        {object.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : filteredObjects.length > 0 ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-3">
              {filteredObjects.length} result{filteredObjects.length !== 1 && 's'}
            </p>
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
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl shrink-0">
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
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {object.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No results found</p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
