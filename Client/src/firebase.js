// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// console.log(import.meta.env.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey:"AIzaSyA1dLaGCZSK1__F4UDRtWz8hU3dShBC5AU",
  authDomain: "mern-blog-5b8c1.firebaseapp.com",
  projectId: "mern-blog-5b8c1",
  storageBucket: "mern-blog-5b8c1.firebasestorage.app",
  messagingSenderId: "270273509388",
  appId: "1:270273509388:web:7e02fee998563a86c9d629"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
