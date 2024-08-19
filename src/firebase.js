import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Init My App With FireBase Config 
const app = initializeApp(firebaseConfig)

// Useing Auth In My App So Must be Link My APP and Method FireBase (getAuth)
const auth = getAuth(app)

// Useing FireStore = dataBase So Must be Link My APP and Method FireBase (getFireStore)
const dataBase = getFirestore(app)

export {auth , dataBase}