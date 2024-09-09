// /* /* // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// //import { getStorage } from "firebase/storage";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// //Old
// /*const firebaseConfig = {
//   apiKey: "AIzaSyAhbc5v0QQ5CcL2LLIl1wc-uXt-hASs08k",
//   authDomain: "jde4116-visualization-tool.firebaseapp.com",
//   projectId: "jde4116-visualization-tool",
//   storageBucket: "jde4116-visualization-tool.appspot.com",
//   messagingSenderId: "106155324859",
//   appId: "1:106155324859:web:5c387782a04a3239da809e",
//   measurementId: "G-33QQZXMYP0"
// };*/

// //New
// const firebaseConfig = {
//   apiKey: "AIzaSyDeHTGsWu5cilfZXwg2f9BhMVis3xDCJoE",
//   authDomain: "event-driven-visualization.firebaseapp.com",
//   projectId: "event-driven-visualization",
//   storageBucket: "event-driven-visualization.appspot.com",
//   messagingSenderId: "743645636910",
//   appId: "1:743645636910:web:e3ee6cb7bfffbb6899f2bf"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// //initialize database
// const db = getDatabase(app);

// // Get a reference to the storage service, which is used to create references in your storage bucket
// //export const storage = getStorage();

// // Create a storage reference from our storage service
// //export const storageRef = ref(storage);