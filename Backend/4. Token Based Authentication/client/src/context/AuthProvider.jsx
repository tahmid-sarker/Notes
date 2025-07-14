import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase.config";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

  const forgetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const singOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }

  // onAuthStateChanged(auth, (currentUser) => {
  //   if (createUser) {
  //     console.log("Has current user :", currentUser);
  //   } else {
  //     console.log("Current User :", currentUser);
  //   }
  // });

  //Get the currently signed-in user

  useEffect(() => { // Subscribe to auth state changes. This will be called when the component mounts and unmounts.
    // Mount means when the component is added to the DOM
    // Unmount means when the component is removed from the DOM
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log('Inside useEffect on auth stage change', currentUser)
      setUser(currentUser);
      setLoading(false);

      // If the user is signed in, send the email to the server to get a JWT token
      // This is an example of how you might send the email to your server to get a JWT token
      if(currentUser?.email) {
        const userEmail = { email: currentUser.email }; // Must be an object to match the server's expected format
        
        // Store the JWT token in localStorage:
        // This token can be used to authenticate requests to your server 
        axios.post("http://localhost:3000/jwt/local", userEmail)
        .then((response) => {
          console.log(response);
          console.log("JWT Data:", response.data);
          console.log("JWT Token:", response.data.token);
          localStorage.setItem("token", response.data.token);
          console.log("Token stored in localStorage");
        })
        .catch((error) => console.log(error))

        // Set the JWT token in a cookie:
        // This is an example of how you might set the token in a cookie
        // This is useful for server-side rendering or when you want to send the token with every request
        // Note: Make sure your server is configured to handle cookies properly
        axios.post("http://localhost:3000/jwt/cookie", userEmail, {
          withCredentials: true // This is important to send cookies with the request. Credentials are cookies, authorization headers, or TLS client certificates.
        })
        .then((response) => {
          console.log(response);
          console.log("Cookie Data:", response.data);
          console.log("Cookie Token:", response.data.token);
        })
        .catch((error) => console.log(error));
      }
    })
    return () => { // Cleanup subscription on unmount
      unSubscribe();
    }
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    forgetPassword,
    updateUser,
    singOutUser
  };
  return (
    <AuthContext value={userInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;

/*
const name = "Tahmid";
const age = 25;

const profile = {
    name,
    age,
}
console.log(profile);
*/