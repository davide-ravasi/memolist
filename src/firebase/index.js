import firebase from "firebase";
import { firebaseConfig } from "./config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInGoogle = () => firebase.auth().signInWithPopup(provider);

export const addUserData = async (user) => {
    console.log('user from google', user);
    if(!user) return false;

    const userRef = await db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();

    if(!userDoc.exists) {
      const { uid, email, displayName: name } = user;
      userRef.set({
        uid,
        name,
        email,
        createdAt: new Date(),
        role: 'reader'
      });
    }

    return userRef;
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
