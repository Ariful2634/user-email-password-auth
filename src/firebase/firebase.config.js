// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6w3vv3xGZhvIt8eYZoIB7q5l-Nce-rbk",
  authDomain: "user-email-password-auth-a7db8.firebaseapp.com",
  projectId: "user-email-password-auth-a7db8",
  storageBucket: "user-email-password-auth-a7db8.appspot.com",
  messagingSenderId: "805252125380",
  appId: "1:805252125380:web:9a3cac4458d28cbc45ef91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;