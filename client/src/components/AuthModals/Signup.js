import { signup } from "../../contexts/firebase/auth";
import { useState } from "react";
import {toast} from 'react-toastify';
import styles from './authpage.module.css';
import { openModal } from "./AuthContainer";

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signup(email, password);
            openModal('login');
        }
        catch (e) {
            toast("Failed to sign up, please try again");
        }
    }

    return ( 
        <div className={styles.modal_container} onClick={()=>openModal('closed')}>
            <div className={styles.modal_content} onClick={(e)=>e.stopPropagation()} >
                <form onSubmit={handleSubmit}>
                    <div className={styles.form_container}>
                        <span className={styles.header}>Sign Up</span>
                        <label className={styles.form_label} htmlFor="email">Email:</label>
                        <input className={styles.form_input} type="text" name="email" onChange={(e)=>setEmail(e.target.value)} />
                        <label className={styles.form_label} htmlFor="password">Password: </label>
                        <input className={styles.form_input} type="password" name="password" onChange={(e)=>setPassword(e.target.value)} />
                        <button className={styles.form_button}>Signup</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default SignUp;