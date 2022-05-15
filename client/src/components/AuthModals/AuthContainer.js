import { useEffect, useState } from "react";
import LogIn from "./Login";
import SignUp from "./Signup";

export let openModal;

const AuthContainer = () => {
    const [open, setOpen] = useState('closed')

    openModal = (type) => {
        if (type === 'closed') {
            setOpen('closed')
        }
        if (type === 'login') {
            setOpen('login')
        }
        if (type === 'signup') {
            setOpen('signup')
        }
    }

    return ( 
        <div className="auth_container">
            {open === 'login' && <LogIn />}
            {open === 'signup' && <SignUp />}
        </div>
    );
}
 
export default AuthContainer;