import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAHki-2TUJVYZFHRSM91JvAzbKon7jlHdQ",
  authDomain: "blockvest-bc812.firebaseapp.com",
  databaseURL: "https://blockvest-bc812-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blockvest-bc812",
  storageBucket: "blockvest-bc812.firebasestorage.app",
  messagingSenderId: "22691495333",
  appId: "1:22691495333:web:1b0159da74edc29725fc4c",
  measurementId: "G-VP63Z5495Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
