import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQlmPz80D9urZnxAig39AdjD5B8lR8DAs",
  authDomain: "chatting-site-39a25.firebaseapp.com",
  projectId: "chatting-site-39a25",
  storageBucket: "chatting-site-39a25.firebasestorage.app",
  messagingSenderId: "1040883025093",
  appId: "1:1040883025093:web:1852097e9352acd88bdcac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);