import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeFirebase from './../Firebase/Firebase.init';

initializeFirebase()

const useFirebase = () => {

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState({})
    const [error, setError] = useState('')

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {

        signOut(auth).then(() => {
            setUser({});
        }).catch((error) => {
            setError(error.message);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
        });
    }, [auth])

    return {
        user,
        error,
        googleSignIn,
        logOut, 
        setUser, 
        setError
    }
}

export default useFirebase;

