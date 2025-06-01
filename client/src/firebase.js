// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-84169.firebaseapp.com",
  projectId: "mern-estate-84169",
  storageBucket: "mern-estate-84169.firebasestorage.app",
  messagingSenderId: "329915781565",
  appId: "1:329915781565:web:8deef0e061badbb13b42d4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);