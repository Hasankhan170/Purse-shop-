
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyDR3vb35dZ9GBcXGByHxGgkmLRiWzNPrTs",
  authDomain: "course-b00af.firebaseapp.com",
  projectId: "course-b00af",
  storageBucket: "course-b00af.firebasestorage.app",
  messagingSenderId: "11984283817",
  appId: "1:11984283817:web:87a013520ff416620261b8",
  measurementId: "G-CE28GEB72H"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);