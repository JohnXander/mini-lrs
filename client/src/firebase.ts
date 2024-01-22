// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mini-lrs.firebaseapp.com",
  projectId: "mini-lrs",
  storageBucket: "mini-lrs.appspot.com",
  messagingSenderId: "753396657401",
  appId: "1:753396657401:web:93ccfb305f819111d80628"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
