import {  useReducer, createContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/auth';


//Create Context
export const UserContext = createContext();

//set up reducer
const rootReducer = (state, action) => {
    switch(action.type){
        case "LOGIN": 
            return {user: {isAuthenticated: true, data: action.payload}};
        case "LOGOUT": 
            return {user: {isAuthenticated: false, user: null} }
        default:
            return state

    }
}



const UserContextProvider = ({children}) => {
    const user = {user: {data: null, isAuthenticated: false}}
    const [state, dispatch] = useReducer(rootReducer, user);

    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            if(user) dispatch({type:'LOGIN', payload:{uid: user.uid} })
            else dispatch({type:'LOGOUT'})
        })
    },[])

    return ( 
        <UserContext.Provider value = {{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}
 
export default UserContextProvider;