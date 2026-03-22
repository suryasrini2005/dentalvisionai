import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, LogIn } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { QuickActions } from '@/components/home/QuickActions';
import { RecentScans } from '@/components/home/RecentScans';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { PaywallModal } from '@/components/PaywallModal';

const Index = () => {
  const { user } = useAuth();
  const { isPro } = useSubscription();
  const [showPaywall, setShowPaywall] = useState(false);
  const navigate = useNavigate();

  return (
    <MobileLayout>
      {/* Header */}
      <header className="gradient-hero pt-12 pb-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-3xl">🦷</span>
            <h1 className="text-2xl font-bold text-foreground">
              Dental Vision AI
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Scan & Learn Dentistry
          </p>
        </motion.div>
      </header>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Scans */}
      <RecentScans />

      {/* Category Grid */}
      <CategoryGrid />

      {/* Study tip */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4 py-6"
      >
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                Study Tip
              </h3>
              <p className="text-muted-foreground text-xs mt-1">
                Use Exam Mode to convert any topic into structured 2-mark, 5-mark,
                and 10-mark answers for your viva preparation.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Disclaimer */}
      <footer className="px-4 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Educational content sourced from standard dental textbooks.
          <br />
          For learning purposes only.
        </p>
      </footer>
    </MobileLayout>
  );
};

export default Index;
