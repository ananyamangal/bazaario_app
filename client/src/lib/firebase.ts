// Firebase web SDK initialization for client-side auth
import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVjnNmds7kdXkoouK2xbAY8rN9J4mafeY",
  authDomain: "bazaario-74850.firebaseapp.com",
  projectId: "bazaario-74850",
  storageBucket: "bazaario-74850.firebasestorage.app",
  messagingSenderId: "953390001880",
  appId: "1:953390001880:web:7fcac4ab580db16cd371ad",
  measurementId: "G-KFFHVQVQMJ",
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { app, auth };
