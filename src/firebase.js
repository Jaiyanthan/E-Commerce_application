import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCF-1dn4Z8lChSH_XkyXTWVfWj8Z68ESso",
  authDomain: "e-commerce-c46d1.firebaseapp.com",
  projectId: "e-commerce-c46d1",
  storageBucket: "e-commerce-c46d1.appspot.com",
  messagingSenderId: "627997262668",
  appId: "1:627997262668:web:f75394587d026501cd85e9",
  measurementId: "G-JX21SS98EG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig); 
const db = firebaseApp.firestore(); 
const auth = firebase.auth();


export {auth }
export  default db ;