import firebase from "firebase";
import { firebaseConfig } from "./config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInGoogle = () => firebase.auth().signInWithPopup(provider);

export const addUserData = async (user) => {

    if(!user) return false;

    const userRef = await db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();

    if(!userDoc.exists) {
      const { uid, email } = user;
      userRef.set({
        uid,
        email,
        createdAt: new Date()
      });
    }

    return userRef;
};
