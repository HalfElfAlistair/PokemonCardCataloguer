import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authStateListener } from "./auth";
// import type { User } from "firebase/auth";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from '../firebase/firebase';

type AuthContextValue = {
    user: User | null;
    authReady: boolean;
    idToken: string | null;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [authReady, setAuthReady] = useState(false);
    const [idToken, setIdToken] = useState<string | null>(null);
    // const [loading, setLoading] = useState(true);

    // const updateAuth = async (firebaseUser: User | null) => {
    //     setUser(firebaseUser);
    //     if (firebaseUser) {
    //         const token = await firebaseUser.getIdToken();
    //         setIdToken(token);
    //     } else {
    //         setIdToken(null);
    //     }
    //     setAuthReady(true);
    // }

    // useEffect(() => {
    //     const unsubscribe = authStateListener((firebaseUser) => updateAuth(firebaseUser));
    //     return unsubscribe;
    // }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                const token = await firebaseUser.getIdToken();
                setIdToken(token);
            } else {
                setIdToken(null);
            }

            // IMPORTANT: authReady must be set here,
            // immediately after onAuthStateChanged fires,
            // not after token retrieval.
            setAuthReady(true);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, idToken, authReady }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}