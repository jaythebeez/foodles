import firebaseapp from "./app";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


export const db = getFirestore(firebaseapp);

//reference to collection
export const colRef = collection(db, 'users');
