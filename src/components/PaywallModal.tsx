import { motion, AnimatePresence } from 'framer-motion';
import { Crown, X, Zap, BookOpen, Camera, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
}

const features = [
  { icon: Camera, text: 'Unlimited AI Scans' },
  { icon: BookOpen, text: 'Full Exam Mode Access' },
  { icon: Zap, text: 'Priority AI Recognition' },
  { icon: CheckCircle, text: 'Offline Content Downloads' },
];

export function PaywallModal({ open, onClose }: PaywallModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/60 flex items-end justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-card rounded-t-3xl p-6 pb-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-accent" />
              <h2 className="text-lg font-bold text-card-foreground">Upgrade to Pro</h2>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-foreground">
              ₹199<span className="text-base font-normal text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Unlock all premium features</p>
          </div>

          <div className="space-y-3 mb-6">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-card-foreground">{f.text}</span>
              </div>
            ))}
          </div>

          {!user ? (
            <div className="space-y-2">
              <Button className="w-full" size="lg" onClick={() => { onClose(); navigate('/auth'); }}>
                Sign In to Subscribe
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Create an account first, then upgrade
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Button className="w-full" size="lg" disabled>
                Coming Soon
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Payment integration will be available soon. Contact admin for Pro access.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
