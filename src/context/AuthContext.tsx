import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthContextValue = {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdmin = async (userId: string) => {
    const { data, error } = await supabase.from('admin_users').select('user_id').eq('user_id', userId).maybeSingle();
    if (error) console.error('admin access check failed', error);
    setIsAdmin(Boolean(data && !error));
  };

  useEffect(() => {
    let active = true;
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setSession(data.session);
      if (data.session) await checkAdmin(data.session.user.id);
      setLoading(false);
    };
    void loadSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_, nextSession) => {
      (async () => {
        if (!active) return;
        setSession(nextSession);
        if (nextSession) await checkAdmin(nextSession.user.id);
        else setIsAdmin(false);
        setLoading(false);
      })();
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('admin sign in failed', error);
      return 'Sign-in failed. Check your email and password.';
    }
    return null;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return <AuthContext.Provider value={{ session, isAdmin, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
