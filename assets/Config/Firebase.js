import {initializeApp} from 'firebase/app';
// import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC0F4TEZGgSJHpDH3kwuPu1wsSMlYWMRo4',
  authDomain: 'logicmessenger.firebaseapp.com',
  projectId: 'logicmessenger',
  storageBucket: 'logicmessenger.appspot.com',
  messagingSenderId: '585646253065',
  appId: '1:585646253065:web:55932497860afc4c4684d8',
  measurementId: 'G-Q3FX495WWM',
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export {db, auth};
