import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onIdTokenChanged, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from '../firebase/firebase';

export type SignInResult = {
    uid: string | null;
    error?: string;
};

export const signInProcess = async (email: string, password: string): Promise<SignInResult> => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return { uid: user.uid };
    } catch (err: any) {
        return { uid: null, error: err.message };
    }
};

export const signOutProcess = () => {
    signOut(auth);
}

export const authStateListener = (callback: (user: User | null) => void) => {
    return onIdTokenChanged(auth, callback);
};


export const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email)
        .then(() => {
            return true;
        }).catch(() => {
            return false;
        })
}