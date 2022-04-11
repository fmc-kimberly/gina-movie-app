import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth,signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import {getFirestore, query, getDocs, collection, where, addDoc} from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from 'react'


//firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCmjFArBURnUtV1Cn7DBrKWhNmfAEyMQ4w",
  authDomain: "gina-movie-app.firebaseapp.com",
  projectId: "gina-movie-app",
  storageBucket: "gina-movie-app.appspot.com",
  messagingSenderId: "968675054871",
  appId:"1:968675054871:web:272d590673b3a46f4a5352"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//connect to db
const db = getFirestore(app)


//auth functions
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
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

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signUpWithEmailAndPassword = async (name, email, password) => {
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

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Your password reset link has been sent to your email!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout =()=>{
  signOut(auth);
  window.location.replace("/")
};


export {logout, sendPasswordReset, logInWithEmailAndPassword, signUpWithEmailAndPassword, signInWithGoogle, db, auth}