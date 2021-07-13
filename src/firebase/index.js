import firebase from "firebase";
import { firebaseConfig } from "./config";
import store from '../redux/store';
import { ERROR_MESSAGE } from "../redux/system/system.types";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// init firestore and auth
// refs: https://firebase.google.com/docs/web/setup
export const db = firebase.firestore();
export const auth = firebase.auth();


// enable firestore persistence
// when app is offline
firebase.firestore().enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log("Multiple tabs open, persistence can only be enabled in one tab at a a time");
    } else if (err.code == 'unimplemented') {
      console.log("The current browser does not support all of the features required to enable persistence");
    }
  });

// connect with google popup
// https://firebase.google.com/docs/auth/web/google-signin
const provider = new firebase.auth.GoogleAuthProvider();
export const signInGoogle = () => firebase.auth().signInWithPopup(provider);

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  } catch (err) {
    store.dispatch({ type: ERROR_MESSAGE, payload: { ...err } });
  }
}

export const manageUserData = async (user) => {

  if (!user) return false;

  const userRef = await db.collection('users').doc(user.uid);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
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

  if (userDoc.exists) {
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
  if (!currentUser) return false;

  const userRef = await db.collection('users').doc(currentUser.uid);
  const userDoc = await userRef.get();

  if (userDoc.exists && userDoc.data().role === 'admin') {
    return true;
  }

  return false;
}
