// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0QUGGF2P1JHKLQGd020Hdn6V8O28yNP4",
  authDomain: "anees-ahmad-1bc53.firebaseapp.com",
  projectId: "anees-ahmad-1bc53",
  storageBucket: "anees-ahmad-1bc53.firebasestorage.app",
  messagingSenderId: "545158977956",
  appId: "1:545158977956:web:10cf15c70aa7bc36bf4931",
  measurementId: "G-VXFPSQY4RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);