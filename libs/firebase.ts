// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcKQYfayGyGSvK_pB7mYcBQ-IpWBl8e80",
  authDomain: "encor6-webshop-8b2b5.firebaseapp.com",
  projectId: "encor6-webshop-8b2b5",
  storageBucket: "encor6-webshop-8b2b5.appspot.com",
  messagingSenderId: "647681047822",
  appId: "1:647681047822:web:91d277b2d42bc7dc50ab5f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
