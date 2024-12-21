import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7xZaJgAkm0uhEfTEjAT3OAoGU1lPzD0o",
  authDomain: "blockvest-7777.firebaseapp.com",
  projectId: "blockvest-7777",
  storageBucket: "blockvest-7777.firebasestorage.app",
  messagingSenderId: "493676757375",
  appId: "1:493676757375:web:a933e282657772a14dda4a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable persistence
try {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.log('Persistence failed - multiple tabs open');
      } else if (err.code === 'unimplemented') {
        console.log('Persistence not available');
      }
    });
} catch (error) {
  console.error('Error initializing persistence:', error);
}