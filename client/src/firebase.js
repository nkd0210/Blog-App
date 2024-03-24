// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-7ab34.firebaseapp.com",
  projectId: "blog-app-7ab34",
  storageBucket: "blog-app-7ab34.appspot.com",
  messagingSenderId: "877101350755",
  appId: "1:877101350755:web:131819307a6681bbce5d56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

