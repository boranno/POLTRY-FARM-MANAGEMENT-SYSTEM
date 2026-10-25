import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

export const firebaseConfig = {
  apiKey: 'your api key',
  authDomain: 'your auth domain',
  projectId: 'your project id',
  databaseURL: 'your database url',
  storageBucket: 'your storage bucket',
  messagingSenderId: 'your messaging sender id',
  appId: 'your app id',
  measurementId: 'your measurement id',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);

export const authReady = signInAnonymously(auth).catch((error) => {
  console.error('Firebase anonymous authentication failed.', error);
  throw error;
});

try {
  getAnalytics(firebaseApp);
} catch (error) {
  console.warn('Firebase Analytics is unavailable in this browser.', error);
}
