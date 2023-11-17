import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/*
 * note: add the firebase package to the app -> go to firestore project settings -> add apps to your firebase project -> the code symbol at the bottom
 * no need for firebase-hosting since we are hosting on vercel
 */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVgJTw8kVYu4DHS8gJcMeXwJ0OB_JZIXc",
  authDomain: "chatgpt-clone-tutorial.firebaseapp.com",
  projectId: "chatgpt-clone-tutorial",
  storageBucket: "chatgpt-clone-tutorial.appspot.com",
  messagingSenderId: "1017603948863",
  appId: "1:1017603948863:web:594574816fa300267b938a",
};

// initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// If there are no apps, initialize the app. Otherwise, get the app.
// However, in a Next.js app, there is a possibility that it has already been initialized as a singleton.
const db = getFirestore(app);

export { db };
