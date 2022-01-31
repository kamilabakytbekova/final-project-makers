import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYwHZ2OlyvpM679mGJjsoe-XT2q7SXmMs",
  authDomain: "laptop-store-589ca.firebaseapp.com",
  projectId: "laptop-store-589ca",
  storageBucket: "laptop-store-589ca.appspot.com",
  messagingSenderId: "821205265174",
  appId: "1:821205265174:web:e469caebbf86b425e67e37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
