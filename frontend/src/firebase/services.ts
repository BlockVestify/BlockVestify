import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from './config';

export interface UserData {
  uid: string;
  username: string;
  email: string;
  phoneNumber: string;
  bonds: Bond[];
  totalInvestment: number;
}

export interface Bond {
  id: string;
  name: string;
  type: string;
  value: number;
  maturityDate: string;
  purchaseDate: string;
}

// Authentication functions
export const signUp = async (
  email: string,
  password: string,
  username: string,
  phoneNumber: string
): Promise<UserData> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile with username
    await updateProfile(user, { displayName: username });

    // Create user document in Firestore
    const userData: UserData = {
      uid: user.uid,
      username,
      email,
      phoneNumber,
      bonds: [],
      totalInvestment: 0
    };

    await setDoc(doc(db, 'users', user.uid), userData);
    return userData;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<UserData> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    return userDoc.data() as UserData;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

// Bond management functions
export const purchaseBond = async (userId: string, bond: Bond) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data() as UserData;

    const updatedBonds = [...userData.bonds, bond];
    const updatedTotalInvestment = userData.totalInvestment + bond.value;

    await updateDoc(userRef, {
      bonds: updatedBonds,
      totalInvestment: updatedTotalInvestment
    });

    return {
      bonds: updatedBonds,
      totalInvestment: updatedTotalInvestment
    };
  } catch (error) {
    throw error;
  }
};

export const getUserBonds = async (userId: string): Promise<Bond[]> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data() as UserData;
    return userData.bonds;
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (userId: string): Promise<UserData> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.data() as UserData;
  } catch (error) {
    throw error;
  }
};
