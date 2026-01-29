import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDF2GKG9FTa6bDojWN8qiPVZtS3O0wa7RQ",
    authDomain: "portfolio-blog-0825.firebaseapp.com",
    projectId: "portfolio-blog-0825",
    storageBucket: "portfolio-blog-0825.firebasestorage.app",
    messagingSenderId: "345375593745",
    appId: "1:345375593745:web:dda977969926043a7568b0",
    measurementId: "G-8WN14C34VJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);