'use client';
import { createContext, useContext, ReactNode } from 'react';

interface User {
  uid: string;
  email: string;
  displayName: string;
  xp: number;
  level: number;
  badges: string[];
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProgress: (xpGained: number, badgesEarned: string[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const contextValue: AuthContextType = {
    user: null,
    firebaseUser: null,
    loading: false,
    signUp: async () => { console.log('Auth désactivé'); },
    signIn: async () => { console.log('Auth désactivé'); },
    signOut: async () => { console.log('Auth désactivé'); },
    updateUserProgress: async () => { console.log('Auth désactivé'); },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser(userData);
          } else {
            // Create user document if it doesn't exist
            const newUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              createdAt: new Date(),
              xp: 10, // Onboarding XP
              level: 1,
              completedLessonIds: [],
              consentMarketing: false
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            setUser(newUser);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string, consentMarketing: boolean) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Firebase Auth profile
      await updateProfile(firebaseUser, { displayName });
      
      // Create user document in Firestore
      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName,
        createdAt: new Date(),
        xp: 10, // Onboarding XP
        level: 1,
        completedLessonIds: [],
        consentMarketing
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      setUser(newUser);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...updates };
      await updateDoc(doc(db, 'users', user.uid), updates);
      setUser(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    signIn,
    signUp,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

