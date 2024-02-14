import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMf4tX_PrdSTnkPDPJNP4pES61ZOMBMO8",
  authDomain: "reactproject-6d0cc.firebaseapp.com",
  projectId: "reactproject-6d0cc",
  storageBucket: "reactproject-6d0cc.appspot.com",
  messagingSenderId: "426929949146",
  appId: "1:426929949146:web:dd4cfac06e34f6579f98e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
export { app, auth, storage};