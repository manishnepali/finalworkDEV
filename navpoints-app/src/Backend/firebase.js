import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  arrayUnion,
  updateDoc,
  arrayRemove,
  doc
} from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7WSPr29OlTfdNcCp0sSSp72RXGEpZp28",
  authDomain: "navit-80963.firebaseapp.com",
  databaseURL: "https://navit-80963-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "navit-80963",
  storageBucket: "navit-80963.appspot.com",
  messagingSenderId: "187689411877",
  appId: "1:187689411877:web:9e49107402b5f0808166cc"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
/**
 * It signs in with Google, and if the user doesn't exist in the database, it creates a new user
 */
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
/**
 * It tries to sign in with the given email and password, and if it fails, it logs the error and alerts
 * the user
 * @param email - The email address of the user.
 * @param password - The user's password.
 */
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
/**
 * It creates a user with the given email and password, and then adds a document to the users
 * collection with the user's uid, name, authProvider, and email
 * @param name - The name of the user.
 * @param email - The email address of the user.
 * @param password - The password for the new account.
 */
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
/**
 * It sends a password reset email to the user with the given email address
 * @param email - The email address of the user to send a password reset email to.
 */
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
/**
 * It signs out the user
 */
const logout = () => {
  signOut(auth);
};
export {
  auth,
  query,
  db,
  getDocs,
  updateDoc,
  where,
  collection,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  setDoc,
  arrayUnion,
  arrayRemove,
  doc
};