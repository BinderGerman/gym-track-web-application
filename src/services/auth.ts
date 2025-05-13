import { app } from "@/config/firebase-config";
import {
  getDoc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { getAuth } from "@firebase/auth";

// ===== Auth variables =====
export const auth = getAuth(app);
export const db = getFirestore(app);

// ===== Create User in DB =====

// ===== Get a Document from a collection =====
export const getDocument = async (path: string) => {
  return (await getDoc(doc(db, path))).data();
};

// ===== Set a Document in a collection =====
export const setDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp();
  return setDoc(doc(db, path), data);
};

// ===== Update a Document in a collection =====
export const updateDocument = (path: string, data: any) => {
  return updateDoc(doc(db, path), data);
};
