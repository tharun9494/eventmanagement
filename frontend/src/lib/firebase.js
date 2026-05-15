import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs8zIPCX_3itbGz6LVJCrkall_khUTrnc",
  authDomain: "ankit-eventmanage.firebaseapp.com",
  projectId: "ankit-eventmanage",
  storageBucket: "ankit-eventmanage.firebasestorage.app",
  messagingSenderId: "390354300435",
  appId: "1:390354300435:web:f261ce54e1f0b9fe5dd9e6",
  measurementId: "G-E6C7RQMZQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
