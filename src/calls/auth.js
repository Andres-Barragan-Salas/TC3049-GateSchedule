import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    signOut 
} from "firebase/auth";

import { auth } from '../firebase-config';
import { setUser } from '../store/slices/userSlice';
import store from '../store/store';

export const createUser = async (data) => {
    const { email, password, username } = data;
    
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;

    await updateProfile(user, { displayName: username });

    store.dispatch(setUser({
		id: user?.uid ?? null,
		username: user?.displayName ?? null,
		email: user?.email ?? null,
		loading: false
	}));
}

export const signUserIn = async (data) => {
    const { email, password } = data;
    
    await signInWithEmailAndPassword(auth, email, password);
}

export const signUserOut = async () => {
    await signOut(auth);
}