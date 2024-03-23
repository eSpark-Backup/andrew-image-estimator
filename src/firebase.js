// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWmhMZ-H6A6t5-X2e6MN-qVF-I-1gAlCQ",
    authDomain: "image-estimator.firebaseapp.com",
    projectId: "image-estimator",
    storageBucket: "image-estimator.appspot.com",
    messagingSenderId: "621379146763",
    appId: "1:621379146763:web:0e0092d0486c3ee4aa630e"
  };
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore(app);
export const storage = getStorage(app);


