// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvp5yysnrSC4VaGkS2tH3FsyoRyJ5k5Z8",
  authDomain: "fir-project-54d1f.firebaseapp.com",
  projectId: "fir-project-54d1f",
  storageBucket: "fir-project-54d1f.appspot.com",
  messagingSenderId: "428952309489",
  appId: "1:428952309489:web:27c65979c5b22e8a986350"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

export default firebaseapp;