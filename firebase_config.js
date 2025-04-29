// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFB0H0uls-Hw1deZdPY43DJLuxbfCB7ak",
  authDomain: "todolist-73c94.firebaseapp.com",
  projectId: "todolist-73c94",
  storageBucket: "todolist-73c94.firebasestorage.app",
  messagingSenderId: "313614051555",
  appId: "1:313614051555:web:867d1b1e43393627f33dd6",
  measurementId: "G-9P8HJVWVJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
