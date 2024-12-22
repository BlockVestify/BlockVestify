import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  bonds: string[];
  totalInvestment: number;
  createdAt: Date;
}

interface UserContextType {
  user: UserData | null;
  loading: boolean;
  setUser: (user: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const createUserData = async (firebaseUser: User) => {
    const userData: UserData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      bonds: [],
      totalInvestment: 0,
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userData);
    return userData;
  };

  const getUserData = async (uid: string): Promise<UserData | null> => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  };

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;

      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        let userData = await getUserData(firebaseUser.uid);
        
        if (!userData) {
          userData = await createUserData(firebaseUser);
        }

        if (mounted) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    setUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
