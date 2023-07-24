import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC2G-hRrF2ijZ-SledXnjMGhzZm97yEE9E",
  authDomain: "streaming-app-d8aaf.firebaseapp.com",
  projectId: "streaming-app-d8aaf",
  storageBucket: "streaming-app-d8aaf.appspot.com",
  messagingSenderId: "1063384331586",
  appId: "1:1063384331586:web:d8be4a3fec36c97e0604db",
  measurementId: "G-ZK19SYV9S2"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
