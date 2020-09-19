import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBJCgNw1nyibes9FevFKqUXPuWNnvJpgVs",
    authDomain: "clone-ks-d479a.firebaseapp.com",
    databaseURL: "https://clone-ks-d479a.firebaseio.com",
    projectId: "clone-ks-d479a",
    storageBucket: "clone-ks-d479a.appspot.com",
    messagingSenderId: "656630215651",
    appId: "1:656630215651:web:368499c0a969f69b0126d6"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };