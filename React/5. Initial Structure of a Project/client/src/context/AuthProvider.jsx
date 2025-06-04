import { useEffect, useState } from 'react';
import { auth } from '../config/firebase.config';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // Create User
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Update Profile
    const updateUser = (name, photo) => {
        const profile = {
            displayName: name,
            photoURL: photo,
        }
        return updateProfile(auth.currentUser, profile)
    }

    // Catch the user data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    // Login User
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Login/Create with google
    const loginWithGoogle = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    // Logout User
    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    // Reset Password
    const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    const authInfo = {
        user,
        loading,
        createUser,
        updateUser,
        loginUser,
        logoutUser,
        loginWithGoogle,
        resetPassword
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;