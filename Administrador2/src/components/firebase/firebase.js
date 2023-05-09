// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { v4 } from 'uuid'

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

export const auth = getAuth(app)

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);


export async function uploadFile(file){
    const storageRef = ref(storage, v4())
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url;
}
