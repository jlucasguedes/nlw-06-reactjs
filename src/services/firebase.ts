// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjYPHO9I8g9iNzskrDQ_dfpU7xTALirNU",
  authDomain: "letmeask-9e9a1.firebaseapp.com",
  databaseURL: "https://letmeask-9e9a1-default-rtdb.firebaseio.com",
  projectId: "letmeask-9e9a1",
  storageBucket: "letmeask-9e9a1.appspot.com",
  messagingSenderId: "909116004717",
  appId: "1:909116004717:web:18959ac22cd4cc8121e264"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);