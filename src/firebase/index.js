import firebase from "firebase";
import { firebaseConfig } from "./config";
import store from '../redux/store';
import { ERROR_MESSAGE } from "../redux/system/system.types";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInGoogle = () => firebase.auth().signInWithPopup(provider);

export const signInWithEmailAndPassword = async (email, password) => {
  try {
     await firebase.auth().signInWithEmailAndPassword(email, password)
  } catch(err) {
    store.dispatch({type: ERROR_MESSAGE, payload: err});
  }
}

export const manageUserData = async (user) => {

    if(!user) return false;

    const userRef = await db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();

    if(!userDoc.exists) {
      const { uid, email, displayName: name, photoURL } = user;
      userRef.set({
        uid,
        name,
        email,
        photoURL,
        createdAt: new Date(),
        role: 'reader'
      });
    }

    if(userDoc.exists) {
      const { uid, email, name, role, createdAt, photoURL } = userDoc.data();
      userRef.set({
        uid,
        name,
        email,
        createdAt,
        photoURL,
        role
      });
    }

    return userDoc.data();
};

export const checkIsAdmin = async (currentUser) => {
  if(!currentUser) return false;

  const userRef = await db.collection('users').doc(currentUser.uid);
  const userDoc = await userRef.get();

  if(userDoc.exists && userDoc.data().role === 'admin') {
    return true;
  }
  
  return false;
}
