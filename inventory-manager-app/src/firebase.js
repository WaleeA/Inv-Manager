import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyChrp1aek1oXtQ5V0ypu9pIeT_YbZ5y-wg",
  authDomain: "manager-db-80177.firebaseapp.com",
  databaseURL:
    "https://manager-db-80177-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "manager-db-80177",
  storageBucket: "manager-db-80177.appspot.com",
  messagingSenderId: "411269423214",
  appId: "1:411269423214:web:196ec0e38c28c6c0e8467f",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
