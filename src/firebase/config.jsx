import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCR2RqLFJX2cnQgn2S5P-kaOPJHub9ofyA",
    authDomain: "greydive-146ac.firebaseapp.com",
    projectId: "greydive-146ac",
    storageBucket: "greydive-146ac.appspot.com",
    messagingSenderId: "1080073097440",
    appId: "1:1080073097440:web:41d10b6b72fdd213b9c085",
    measurementId: "G-TBMK703EH7"
  };

const app = initializeApp(firebaseConfig);

export const store = getFirestore(app)