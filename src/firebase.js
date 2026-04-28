import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, signOut } from "firebase/auth";
import { get, getDatabase, push, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_apiKey,
  authDomain: import.meta.env.VITE_APP_authDomain,
  databaseURL: import.meta.env.VITE_APP_databaseURL,
  projectId: import.meta.env.VITE_APP_projectId,
  storageBucket: import.meta.env.VITE_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_APP_messagingSenderId,
  appId: import.meta.env.VITE_APP_appId,
};

const dbname = "scores";

// Initialize Firebase

initializeApp(firebaseConfig);
const auth = getAuth();

export const login = (setScores) => {
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
      console.log("🚀 ~ getScores ~ Signed in..:", "Signed in..");
    })
    .catch((error) => {
      console.error("🚀 ~ getScores ~ error:", error);
      // ...
    });
  fetchData(setScores);
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("🚀 ~ App ~ Signed out..:", "Signed out..");
    })
    .catch((error) => {
      console.error("🚀 ~ App ~ error:", error);
    });
};

export const fetchData = async (setScores) => {
  const db = getDatabase();
  const dbRef = ref(db, dbname);
  const snapshot = await get(dbRef);
  const data = snapshot.val();
  setScores(data || []);
};

export const postData = async (score, setScores) => {
  const db = getDatabase();
  const dbRef = ref(db, dbname);
  await push(dbRef, score);
  fetchData(setScores);
};
