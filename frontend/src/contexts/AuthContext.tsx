import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import { supabaseAuth, UserProfile } from '../services/supabase-auth';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabaseAuth.getCurrentUser().then((user) => {
      setUser(user);
      if (user) {
        supabaseAuth.getUserProfile(user.id).then(setUserProfile);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const profile = await supabaseAuth.getUserProfile(session.user.id);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user } = await supabaseAuth.signIn(email, password);
    if (user) {
      const profile = await supabaseAuth.getUserProfile(user.id);
      setUserProfile(profile);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { user } = await supabaseAuth.signUp(email, password, name);
    if (user) {
      const profile = await supabaseAuth.getUserProfile(user.id);
      setUserProfile(profile);
    }
  };

  const signOut = async () => {
    await supabaseAuth.signOut();
    setUser(null);
    setUserProfile(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');
    await supabaseAuth.updateProfile(user.id, updates);
    setUserProfile(prev => prev ? { ...prev, ...updates } : null);
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
