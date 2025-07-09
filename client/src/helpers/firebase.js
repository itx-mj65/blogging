// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getEnv } from "./getenv";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY"),
  authDomain: "blogging-eab5f.firebaseapp.com",
  projectId: "blogging-eab5f",
  storageBucket: "blogging-eab5f.firebasestorage.app",
  messagingSenderId: "96159888166",
  appId: "1:96159888166:web:54c2a6c100a5b6b27647e7",
  measurementId: "G-718DXE0TDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { Auth, provider };