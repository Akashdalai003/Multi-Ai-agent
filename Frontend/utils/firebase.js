// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zeno-55803.firebaseapp.com",
  projectId: "zeno-55803",
  storageBucket: "zeno-55803.firebasestorage.app",
  messagingSenderId: "663190684524",
  appId: "1:663190684524:web:535e0ae2432579bc8d6949"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()

