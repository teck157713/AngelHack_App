import { createSlice } from "@reduxjs/toolkit";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBYtTKC246wxBQmyKZywqXnELXQu5zvjSE",
    authDomain: "changes-13858.firebaseapp.com",
    projectId: "changes-13858",
    storageBucket: "changes-13858.appspot.com",
    messagingSenderId: "17656381055",
    appId: "1:17656381055:web:fb571d2f7b6336d729094a",
    measurementId: "G-YYD33R24BK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const initialState = {
    app,
    auth,
    firestore
}

export const firebaseSlice = createSlice({
    name: "firebase",
    initialState,
    reducers: {

    }
})