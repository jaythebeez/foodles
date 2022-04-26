import firebaseapp from "./app";
import {  getFunctions  } from 'firebase/functions';

export const functions = getFunctions(firebaseapp);