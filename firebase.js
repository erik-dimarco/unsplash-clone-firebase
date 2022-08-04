// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEvJ57kuiHexPt7MUTI5i4UYEu33JxzAs",
  authDomain: "unsplash-bcf57.firebaseapp.com",
  projectId: "unsplash-bcf57",
  storageBucket: "unsplash-bcf57.appspot.com",
  messagingSenderId: "619631217399",
  appId: "1:619631217399:web:472a477c702c0aa051a1f2",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
