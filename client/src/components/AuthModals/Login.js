import { useEffect, useState, useContext } from "react";
import { login } from "../../contexts/firebase/auth";
import { UserContext } from "../../contexts/UserContext";
import styles from './authpage.module.css';
import {  toast  } from 'react-toastify';

const LogIn = ({handleAuthModal}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {state} = useContext(UserContext);
    const {user} = state;

    useEffect(()=>{
        //if the user is already logged in return to the previous page
        if(user.isAuthenticated) handleAuthModal('close');
    } ,[user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await login(email, password); 
        }
        catch (e) {
            toast("Failed to log in, please try again")
        }
    }
    return ( 
        <div className={styles.modal_container} onClick={()=>handleAuthModal('close')}>
            <div className={styles.modal_content} onClick={(e)=>e.stopPropagation()} >
                <form onSubmit={handleSubmit}>
                    <div className={styles.form_container}>
                        <span className={styles.header}>Login</span>
                        <label className={styles.form_label} htmlFor="email">Email:</label>
                        <input className={styles.form_input} type="text" name="email" onChange={(e)=>setEmail(e.target.value)} />
                        <label className={styles.form_label} htmlFor="password">Password: </label>
                        <input className={styles.form_input} type="password" name="password" onChange={(e)=>setPassword(e.target.value)} />
                        <button className={styles.form_button}>Log In</button>
                        </div>
                </form>
            </div>
        </div>
     );
}
 
export default LogIn;