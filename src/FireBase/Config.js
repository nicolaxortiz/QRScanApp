import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function UseFireBase() {
  const firebaseConfig = {
    apiKey: "AIzaSyB708J2KFqQ7fTp6vRuj6SGW6EMP9xc6vE",
    authDomain: "qrscanapp-292f9.firebaseapp.com",
    projectId: "qrscanapp-292f9",
    storageBucket: "qrscanapp-292f9.appspot.com",
    messagingSenderId: "412784086019",
    appId: "1:412784086019:web:24e0caf2d57ff098b85236",
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(); //Base de datos
  const auth = getAuth(app); //Authentication

  return { db, auth };
}
