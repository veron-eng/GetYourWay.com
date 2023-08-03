"use client";
import React, { useState, useEffect, createContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseAuth";

// Create a React context for the auth state
export const AuthContext = createContext<{
  isSignedIn: boolean | undefined;
  user: User | undefined;
}>({isSignedIn: undefined, user: undefined});


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsSignedIn(true);
      } else {
        setUser(undefined);
        setIsSignedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{isSignedIn, user}}>{children}</AuthContext.Provider>
  );
};
