// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Timestamp, getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz2wGAcv7SmDpnz8dhujN9XyPKsSTXCjI",
    authDomain: "vidanuevasystem-0.firebaseapp.com",
    projectId: "vidanuevasystem-0",
    storageBucket: "vidanuevasystem-0.appspot.com",
    messagingSenderId: "65220964712",
    appId: "1:65220964712:web:6fc220786123b8053fa6dd",
    measurementId: "G-4PH288SM2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);



//Arreglo con servicions
//const servicios = [];

// servicios.forEach( async servicio => {
//     const q = query(collection(db, "TURNOS"), where("ID_SERVICIO", "==", servicio));

//     let contador = 0
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         contador +=1
//     });
//     console.log(`${servicio} = ${contador}`)
// })