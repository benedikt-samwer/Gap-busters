import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3BbZjZp6obtnY5AIUN0gueW9ODZndZtw",
  authDomain: "gapbusters-90f4a.firebaseapp.com",
  projectId: "gapbusters-90f4a",
  storageBucket: "gapbusters-90f4a.appspot.com",
  messagingSenderId: "232857952376",
  appId: "1:232857952376:web:72caf5558c2b513de9cd8d",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
