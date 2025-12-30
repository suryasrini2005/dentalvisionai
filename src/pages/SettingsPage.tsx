import { motion } from 'framer-motion';
import { Download, Moon, Globe, Info, Shield, BookOpen, ChevronRight } from 'lucide-react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <MobileLayout>
      {/* Header */}
      <header className="gradient-hero pt-12 pb-6 px-4">
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your experience
        </p>
      </header>

      {/* Settings List */}
      <div className="px-4 py-4 space-y-6">
        {/* Preferences */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Preferences
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <SettingsItem
              icon={Download}
              title="Offline Downloads"
              subtitle="Save content for offline access"
            >
              <Switch />
            </SettingsItem>
            <SettingsItem
              icon={Moon}
              title="Dark Mode"
              subtitle="Use dark theme"
            >
              <Switch />
            </SettingsItem>
            <SettingsItem
              icon={Globe}
              title="Language"
              subtitle="English"
              showArrow
            />
          </div>
        </section>

        {/* Study */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Study Settings
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <SettingsItem
              icon={BookOpen}
              title="Default Level"
              subtitle="Undergraduate (UG)"
              showArrow
            />
          </div>
        </section>

        {/* About */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            About
          </h2>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <SettingsItem
              icon={Info}
              title="About Dental Vision AI"
              subtitle="Version 1.0.0"
              showArrow
            />
            <SettingsItem
              icon={Shield}
              title="Privacy Policy"
              showArrow
            />
          </div>
        </section>

        {/* Disclaimer */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-primary/5 border border-primary/20 rounded-xl p-4"
        >
          <h3 className="font-semibold text-foreground text-sm mb-2">
            Educational Disclaimer
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This application is designed for educational purposes only. All content
            is paraphrased from standard dental textbooks and properly referenced.
            The AI recognition feature provides suggestions and should be verified
            by qualified dental professionals. Not intended for clinical diagnosis.
          </p>
        </motion.section>

        {/* References */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-4"
        >
          <h3 className="font-semibold text-foreground text-sm mb-2">
            📚 Primary References
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Phillips' Science of Dental Materials, 13th Edition</li>
            <li>• Wheeler's Dental Anatomy, 10th Edition</li>
            <li>• Fundamentals of Operative Dentistry, 4th Edition</li>
          </ul>
        </motion.section>
      </div>
    </MobileLayout>
  );
}

function SettingsItem({
  icon: Icon,
  title,
  subtitle,
  children,
  showArrow,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  showArrow?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-card-foreground">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
      {showArrow && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
    </div>
  );
}
