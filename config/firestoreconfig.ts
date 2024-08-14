// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0Unja-0gwUaeDtcVPaGgUJKJi-UB-UnU",
    authDomain: "test-c1543.firebaseapp.com",
    projectId: "test-c1543",
    storageBucket: "test-c1543.appspot.com",
    messagingSenderId: "746046702041",
    appId: "1:746046702041:web:7564f882c0338066fdd9c8",
    measurementId: "G-C2J71W7W5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };