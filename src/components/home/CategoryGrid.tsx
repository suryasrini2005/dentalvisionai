import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '@/data/dentalData';

export function CategoryGrid() {
  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Browse Categories</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={`/categories?filter=${category.id}`}
              className="block bg-card rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-medium text-card-foreground text-sm">
                {category.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {category.count} items
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
