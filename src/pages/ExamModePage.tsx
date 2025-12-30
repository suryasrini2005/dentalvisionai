import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, ChevronRight } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { dentalObjects, categories, getCategoryColor, getCategoryLabel } from '@/data/dentalData';
import { cn } from '@/lib/utils';

type AnswerFormat = '2mark' | '5mark' | '10mark';

export default function ExamModePage() {
  const [level, setLevel] = useState<'UG' | 'PG'>('UG');
  const [format, setFormat] = useState<AnswerFormat>('5mark');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredObjects = selectedCategory
    ? dentalObjects.filter(
        (obj) => obj.category === selectedCategory && obj.level === level
      )
    : dentalObjects.filter((obj) => obj.level === level);

  return (
    <MobileLayout>
      {/* Header */}
      <header className="gradient-hero pt-12 pb-6 px-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Exam Mode</h1>
            <p className="text-sm text-muted-foreground">
              Structured answers for viva prep
            </p>
          </div>
        </div>
      </header>

      {/* Level Selection */}
      <section className="px-4 py-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">
          Select Level
        </h2>
        <div className="flex gap-2">
          <Button
            variant={level === 'UG' ? 'default' : 'outline'}
            onClick={() => setLevel('UG')}
            className="flex-1"
          >
            Undergraduate (UG)
          </Button>
          <Button
            variant={level === 'PG' ? 'default' : 'outline'}
            onClick={() => setLevel('PG')}
            className="flex-1"
          >
            Postgraduate (PG)
          </Button>
        </div>
      </section>

      {/* Answer Format */}
      <section className="px-4 py-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">
          Answer Format
        </h2>
        <div className="flex gap-2">
          {[
            { key: '2mark', label: '2-Mark' },
            { key: '5mark', label: '5-Mark' },
            { key: '10mark', label: '10-Mark' },
          ].map((item) => (
            <Button
              key={item.key}
              variant={format === item.key ? 'default' : 'outline'}
              onClick={() => setFormat(item.key as AnswerFormat)}
              size="sm"
              className="flex-1"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 py-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">
          Filter by Category
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(null)}
            size="sm"
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat.id)}
              size="sm"
              className="shrink-0"
            >
              {cat.icon} {cat.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Topics List */}
      <section className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">
            Topics ({filteredObjects.length})
          </h2>
        </div>

        <div className="space-y-3">
          {filteredObjects.map((object, index) => (
            <motion.div
              key={object.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link
                to={`/object/${object.id}?tab=exam`}
                className="block bg-card rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg">
                      {object.category === 'material' && '🧪'}
                      {object.category === 'instrument' && '🔧'}
                      {object.category === 'tooth' && '🦷'}
                      {object.category === 'equipment' && '⚙️'}
                    </div>
                    <div>
                      <h3 className="font-medium text-card-foreground text-sm">
                        {object.name}
                      </h3>
                      <span
                        className={cn(
                          "text-[10px] font-medium px-2 py-0.5 rounded-full border inline-block mt-1",
                          getCategoryColor(object.category)
                        )}
                      >
                        {getCategoryLabel(object.category)}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* Preview of selected format */}
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-1 text-xs text-primary mb-1">
                    <BookOpen className="w-3 h-3" />
                    {format === '2mark' && '2-Mark Answer'}
                    {format === '5mark' && '5-Mark Answer'}
                    {format === '10mark' && '10-Mark Answer'}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {format === '2mark' && object.examNotes.twoMark}
                    {format === '5mark' && object.examNotes.fiveMark}
                    {format === '10mark' && object.examNotes.tenMark}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </MobileLayout>
  );
}
