import { getApp, getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, onAuthStateChanged, User } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { useEffect, useMemo, useState } from "react";
import { FirebaseContext } from "../contexts/firebase.context";
import LoadingScreen from "../components/LoadingScreen";

const config = {
    apiKey: "AIzaSyB-4MdewLtEIfpPf-veDeLismr5miZiQ34",
    authDomain: "contractors-dc3b8.firebaseapp.com",
    projectId: "contractors-dc3b8",
    // storageBucket: "contractors-dc3b8.appspot.com",
    messagingSenderId: "205250107756",
    appId: "1:205250107756:web:8f2535d49baf5418bf7b49",
    measurementId: "G-B587HKK0Q3"
};

export default function FirebaseProvider({ children }: { children: JSX.Element }) {
    const [ user, setUser ] = useState<User | undefined>();
    const isLocal = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

    const firebase = useMemo(() => {
        const initialized = !!getApps().length;

        const app = initialized ? getApp() : initializeApp(config);
        const auth = getAuth(app);
        const firestore = getFirestore(app);
        const functions = getFunctions(app);

        // Connect to emulator if it is in development
        if (!initialized && isLocal) {
            connectAuthEmulator(auth, "http://localhost:9099");
            connectFirestoreEmulator(firestore, "localhost", 8080);
            connectFunctionsEmulator(functions, "localhost", 5001);
        }

        return {
            app,
            auth,
            firestore,
            functions
        };
    }, [config]);

    useEffect(() => {
        if (firebase.auth) {
            const unsub = onAuthStateChanged(firebase.auth, (user) => {
                setUser(user || undefined);
            })

            return () => unsub();
        }
    }, [firebase.auth]);

    return (
        <FirebaseContext.Provider value={{
            ...firebase,
            user
        }}>
            {
                !firebase.auth || !firebase.firestore || !firebase.functions ?
                    <LoadingScreen /> :
                    children
            }
        </FirebaseContext.Provider>
    )
}