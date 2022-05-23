// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB--QsABM-B0Sp_YPMtfmER4qYqUYdqd5U",
  authDomain: "tc3049-gateschedule.firebaseapp.com",
  projectId: "tc3049-gateschedule",
  storageBucket: "tc3049-gateschedule.appspot.com",
  messagingSenderId: "163178371003",
  appId: "1:163178371003:web:996a21d623ad31fc2b969e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

