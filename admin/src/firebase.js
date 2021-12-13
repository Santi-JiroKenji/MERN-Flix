import firebase from "firebase";

const firebaseConfig = {
    // apiKey: "AIzaSyDuGoTv9eEPDiBkIvuUN_fGz6YZ4UsdalI",
    apiKey: process.env.APP_KEY,
    authDomain: "mernflix-d07b5.firebaseapp.com",
    projectId: "mernflix-d07b5",
    storageBucket: "mernflix-d07b5.appspot.com",
    messagingSenderId: "90767704078",
    appId: "1:90767704078:web:13f3727ec1e1fe043a3c5f",
    measurementId: "G-T9BEKDMB3Z",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;