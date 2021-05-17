import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCzzVWx5r7qNHHZg0EyYWs24zW605slZ1M',
  authDomain: 'crwn-db-d1edc.firebaseapp.com',
  projectId: 'crwn-db-d1edc',
  storageBucket: 'crwn-db-d1edc.appspot.com',
  messagingSenderId: '710786349703',
  appId: '1:710786349703:web:89d5e58fbde1f6bf1dd622',
  measurementId: 'G-WQQ3YLBVSF',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creatiung user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
