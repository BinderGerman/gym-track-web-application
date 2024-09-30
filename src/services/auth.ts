import { app } from "@/config/firebase-config";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  updateProfile,
  createUserWithEmailAndPassword,
} from "@firebase/auth";

// ===== Auth variables =====
export const auth = getAuth(app);
export const db = getFirestore(app)


// ===== Auth functions =====

// ===== Create user with Email and Password =====
export const createUser = async (user: {email: string, password: string}) => {
	return await createUserWithEmailAndPassword(auth, user.email, user.password)
}

export const updateUser = (user: { displayName?: string | null; photoURL?: string | null; }) => {
  if(auth.currentUser) return updateProfile(auth.currentUser, user )
}


// ===== Sign In with Email and Password =====
export const signIn = async (user: {email: string, password: string}) => {
	return await signInWithEmailAndPassword(auth, user.email, user.password)
}


// ===== Create User in DB =====
// ===== Set a Document in a collection =====
export const setDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp()
  return setDoc(doc(db, path), data)
}