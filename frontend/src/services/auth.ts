import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface SignUpData {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const signUp = async (data: SignUpData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;

    // Update user profile
    await updateProfile(user, {
      displayName: data.username
    });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: data.email,
      displayName: data.username,
      phoneNumber: data.phoneNumber,
      bonds: [],
      totalInvestment: 0,
      createdAt: new Date()
    });

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signIn = async (data: SignInData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
