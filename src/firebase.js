// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {    
  apiKey: "AIzaSyAvabCPdpbo8kKNgD6krHVWA8BcpfTT9pg",
  authDomain: "ics4u-7cfcc.firebaseapp.com",
  projectId: "ics4u-7cfcc",
  storageBucket: "ics4u-7cfcc.firebasestorage.app",
  messagingSenderId: "170296114594",
  appId: "1:170296114594:web:b37b621f1d099e00ad46fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;