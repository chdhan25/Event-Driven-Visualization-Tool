// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhbc5v0QQ5CcL2LLIl1wc-uXt-hASs08k",
  authDomain: "jde4116-visualization-tool.firebaseapp.com",
  projectId: "jde4116-visualization-tool",
  storageBucket: "jde4116-visualization-tool.appspot.com",
  messagingSenderId: "106155324859",
  appId: "1:106155324859:web:5c387782a04a3239da809e",
  measurementId: "G-33QQZXMYP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

