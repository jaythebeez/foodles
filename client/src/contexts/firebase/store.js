import firebaseapp from "./app";
import { getFirestore, collection } from 'firebase/firestore';


export const db = getFirestore(firebaseapp);

//reference to collection
export const colRef = collection(db, 'users');

export const recipeColRef = collection(db, 'recipes');

