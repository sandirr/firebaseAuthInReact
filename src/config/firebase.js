import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzFCUKkaODvcZB63Tw2bRYhsoWeGmD-bs",
    authDomain: "projectauth-22b90.firebaseapp.com",
    projectId: "projectauth-22b90",
    storageBucket: "projectauth-22b90.appspot.com",
    messagingSenderId: "19066239852",
    appId: "1:19066239852:web:5f68f3648caac7087f9149"
  };
  // Initialize Firebase
const init = firebase.initializeApp(firebaseConfig);
export const firebaseAuthentication = init.auth();