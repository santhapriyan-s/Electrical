// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgJXNfYley_SrINZU4R4DblGrqcYVuQcU",
  authDomain: "full-stack-1900a.firebaseapp.com",
  projectId: "full-stack-1900a",
  storageBucket: "full-stack-1900a.appspot.com",
  messagingSenderId: "692492469216",
  appId: "1:692492469216:web:11d0a6c77ed18508646185",
  measurementId: "G-2M6SXQZ7ST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export auth and provider
export { auth, googleProvider };
export default app;