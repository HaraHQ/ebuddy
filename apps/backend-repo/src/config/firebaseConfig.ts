import { initializeApp } from 'firebase/app';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { FIRESTORE_PORT, FIRESTORE_URL, STORAGE_PORT, STORAGE_URL } from './env';

const firebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'localhost',
  projectId: 'ebuddy-3d760',
  storageBucket: 'demo-firebase.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456'
};

const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore and connect to the emulator
const firestore = getFirestore(firebaseApp);
connectFirestoreEmulator(firestore, FIRESTORE_URL, Number(FIRESTORE_PORT));

const storage = getStorage(firebaseApp);
connectStorageEmulator(storage, STORAGE_URL, Number(STORAGE_PORT));

export { firebaseApp, firestore, storage };
