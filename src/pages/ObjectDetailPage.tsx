import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dentalObjects, getCategoryColor, getCategoryLabel } from '@/data/dentalData';
import { cn } from '@/lib/utils';

export default function ObjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const object = dentalObjects.find((o) => o.id === id);

  if (!object) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Object not found</p>
          <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="gradient-hero sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Object Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 -mt-2"
      >
        <div className="bg-card rounded-2xl border border-border shadow-md overflow-hidden">
          {/* Image */}
          <div className="aspect-video bg-muted flex items-center justify-center">
            <span className="text-6xl">
              {object.category === 'material' && '🧪'}
              {object.category === 'instrument' && '🔧'}
              {object.category === 'tooth' && '🦷'}
              {object.category === 'equipment' && '⚙️'}
            </span>
          </div>

          {/* Title */}
          <div className="p-4">
            <span
              className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-full border inline-block mb-2",
                getCategoryColor(object.category)
              )}
            >
              {getCategoryLabel(object.category)}
            </span>
            <h1 className="text-xl font-bold text-card-foreground">
              {object.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {object.description}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                {object.level} Level
              </span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {object.references[0]?.split(',')[0]}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-4 mt-6"
      >
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="properties" className="text-xs">Properties</TabsTrigger>
            <TabsTrigger value="clinical" className="text-xs">Clinical</TabsTrigger>
            <TabsTrigger value="exam" className="text-xs">Exam</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <ContentCard title="Composition">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {object.composition}
              </p>
            </ContentCard>

            <ContentCard title="Uses">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {object.uses}
              </p>
            </ContentCard>

            {object.mnemonics && (
              <ContentCard title="Mnemonic">
                <p className="text-sm text-primary font-medium bg-primary/5 p-3 rounded-lg">
                  💡 {object.mnemonics}
                </p>
              </ContentCard>
            )}
          </TabsContent>

          <TabsContent value="properties" className="space-y-4">
            {object.properties.physical && (
              <ContentCard title="Physical Properties">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {object.properties.physical}
                </p>
              </ContentCard>
            )}

            {object.properties.mechanical && (
              <ContentCard title="Mechanical Properties">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {object.properties.mechanical}
                </p>
              </ContentCard>
            )}

            {object.properties.biological && (
              <ContentCard title="Biological Properties">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {object.properties.biological}
                </p>
              </ContentCard>
            )}
          </TabsContent>

          <TabsContent value="clinical" className="space-y-4">
            <ContentCard title="Advantages">
              <ul className="space-y-2">
                {object.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-success mt-0.5">✓</span>
                    {adv}
                  </li>
                ))}
              </ul>
            </ContentCard>

            <ContentCard title="Limitations">
              <ul className="space-y-2">
                {object.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive mt-0.5">✗</span>
                    {lim}
                  </li>
                ))}
              </ul>
            </ContentCard>

            <ContentCard title="Clinical Tips">
              <ul className="space-y-2">
                {object.clinicalTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </ContentCard>
          </TabsContent>

          <TabsContent value="exam" className="space-y-4">
            <ContentCard title="2-Mark Answer">
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                {object.examNotes.twoMark}
              </p>
            </ContentCard>

            <ContentCard title="5-Mark Answer">
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                {object.examNotes.fiveMark}
              </p>
            </ContentCard>

            <ContentCard title="10-Mark Answer">
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-lg">
                {object.examNotes.tenMark}
              </p>
            </ContentCard>

            <ContentCard title="References">
              <ul className="space-y-1">
                {object.references.map((ref, i) => (
                  <li key={i} className="text-sm text-primary">
                    📚 {ref}
                  </li>
                ))}
              </ul>
            </ContentCard>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

function ContentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <h3 className="font-semibold text-card-foreground text-sm mb-3">{title}</h3>
      {children}
    </div>
  );
}
