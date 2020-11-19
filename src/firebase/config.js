import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBKnRhpd3uGThHKlGVktVby5FPdBCz1XCQ",
    authDomain: "todoapp-2c6e5.firebaseapp.com",
    databaseURL: "https://todoapp-2c6e5.firebaseio.com",
    projectId: "todoapp-2c6e5",
    storageBucket: "todoapp-2c6e5.appspot.com",
    messagingSenderId: "831096100566",
    appId: "1:831096100566:web:b877c07f2665e25d835b77"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();