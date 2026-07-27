import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGXKxSt8bmww5xAawl_kUcsrGxR6TCESs",
  authDomain: "unsplashzz.firebaseapp.com",
  projectId: "unsplashzz",
  storageBucket: "unsplashzz.firebasestorage.app",
  messagingSenderId: "378106131536",
  appId: "1:378106131536:web:cd86389c2f1c6ac0518d55",
  measurementId: "G-HDSRKTJCWG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();