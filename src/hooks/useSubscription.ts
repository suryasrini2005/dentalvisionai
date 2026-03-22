import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionStatus {
  isPro: boolean;
  loading: boolean;
  expiresAt: string | null;
}

export function useSubscription(): SubscriptionStatus {
  const { user } = useAuth();
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setIsPro(false);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('is_pro, pro_expires_at')
        .eq('id', user.id)
        .single();

      if (data) {
        const active = data.is_pro && (!data.pro_expires_at || new Date(data.pro_expires_at) > new Date());
        setIsPro(active);
        setExpiresAt(data.pro_expires_at);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  return { isPro, loading, expiresAt };
}
