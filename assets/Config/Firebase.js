import {initializeApp} from 'firebase/app';
// import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';
import {firebaseConfig} from '../../env.js';

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export {db, auth};
