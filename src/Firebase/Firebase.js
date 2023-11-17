import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBsx6ihUz9MSbwfSxWQZvLlP1i_cfnFOu4",
  authDomain: "filmyworld-47494.firebaseapp.com",
  projectId: "filmyworld-47494",
  storageBucket: "filmyworld-47494.appspot.com",
  messagingSenderId: "1089675631038",
  appId: "1:1089675631038:web:dea616c937affafe6481ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// access firestore data-base
export const db = getFirestore(app);

// access collection from fireStore data-base
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;