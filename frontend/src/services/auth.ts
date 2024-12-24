export interface User {
  id: string;
  email: string;
  displayName: string | null;
}

export interface AuthError {
  code: string;
  message: string;
}

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user storage
const STORAGE_KEY = 'blockvest_auth_user';

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    // Simulate API call
    await delay(1000);
    
    // In a real app, this would be an API call to validate credentials
    if (password.length < 6) {
      throw new Error('Invalid credentials');
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      displayName: email.split('@')[0]
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    notifyAuthStateChange(user);
    return user;
  } catch (error) {
    throw { code: 'auth/invalid-credentials', message: 'Invalid email or password' };
  }
};

// Sign up with email and password
export const signUp = async (email: string, password: string, displayName: string): Promise<User> => {
  try {
    await delay(1000);

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      displayName
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    notifyAuthStateChange(user);
    return user;
  } catch (error) {
    throw { code: 'auth/signup-failed', message: 'Failed to create account' };
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  await delay(500);
  localStorage.removeItem(STORAGE_KEY);
  notifyAuthStateChange(null);
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  await delay(1000);
  // In a real app, this would send a password reset email
  console.log('Password reset email sent to:', email);
};

type AuthStateCallback = (user: User | null) => void;
const listeners = new Set<AuthStateCallback>();

export const subscribeToAuthChanges = (callback: AuthStateCallback): (() => void) => {
  listeners.add(callback);
  
  // Call immediately with current user
  const currentUser = getCurrentUser();
  callback(currentUser);
  
  return () => {
    listeners.delete(callback);
  };
};

export const notifyAuthStateChange = (user: User | null): void => {
  listeners.forEach(callback => callback(user));
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(STORAGE_KEY);
  return userJson ? JSON.parse(userJson) : null;
};
