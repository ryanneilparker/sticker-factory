import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVFZTC7wzqhuQvbHi9Oj55HepexKXio5o",
  authDomain: "sticker-factory-411909.firebaseapp.com",
  projectId: "sticker-factory-411909",
  storageBucket: "sticker-factory-411909.appspot.com",
  messagingSenderId: "599815819108",
  appId: "1:599815819108:web:dc3a72f4319123f8f43471",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
