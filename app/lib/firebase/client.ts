// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "test-blog-d5977.firebaseapp.com",
  projectId: "test-blog-d5977",
  storageBucket: "test-blog-d5977.appspot.com",
  messagingSenderId: "1037450980690",
  appId: "1:1037450980690:web:a93e11d8716a306de51e8b",
  measurementId: "G-0613072YY6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, auth, db };
