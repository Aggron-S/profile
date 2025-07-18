// Header
import wLogo from "../assets/canva/w-logo.png";
import meCropped from "../assets/img/me-cropped.png";

// Main
import aboutMe2 from "../assets/canva/about-me-2.png";
import websiteDevelopment from "../assets/icons/website-development.svg";
import apiIntegration from "../assets/icons/api-integration.svg";
import businessProcessAutomation from "../assets/icons/business-process-automation.svg";
import softwareDevelopment from "../assets/icons/software-development.svg";

import cpp from "../assets/canva/c++.png";
import python from "../assets/canva/python.png";
import java from "../assets/canva/java.png";
import html from "../assets/canva/html-5.png";
import css from "../assets/canva/css-3.png";
import js from "../assets/canva/js.png";

// Footer 
import instagram from "../assets/icons/instagram.svg";

// ----------------- Firebase --------------------------//
// Init Firebase
import { initializeApp } from 'firebase/app';
// // Auth
// import { getAuth } from 'firebase/auth';

// Firestore
import { getFirestore } from 'firebase/firestore';
// Storage
import { getStorage } from 'firebase/storage';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyChNbEXf42SwJ5NbfXX2ErRA9aj33SI3T8",
  authDomain: "test-8b653.firebaseapp.com",
  projectId: "test-8b653",
  storageBucket: "test-8b653.appspot.com",
  messagingSenderId: "239932044719",
  appId: "1:239932044719:web:b0a9cf95acb7e26808eb5a",
  measurementId: "G-Z94TSFBYWQ"
};

// Initialize & Export Firebase App
const firebaseApp = initializeApp(firebaseConfig);
// Initialize & Export Services
// export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);


export {
  // Header
  wLogo, meCropped,
  // Main
  aboutMe2, websiteDevelopment, apiIntegration, businessProcessAutomation, softwareDevelopment, cpp, python,
  java, html, css, js, 
  // Footer
  instagram
}
