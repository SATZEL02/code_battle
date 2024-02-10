// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "codebattle-e9be8.firebaseapp.com",
  projectId: "codebattle-e9be8",
  storageBucket: "codebattle-e9be8.appspot.com",
  messagingSenderId: "167150262766",
  appId: "1:167150262766:web:adc0ef246d7dab563fd6ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);