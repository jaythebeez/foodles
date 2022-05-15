import { UserContext } from "../../contexts/UserContext";
import { logout } from "../../contexts/firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from './authbuttons.module.css'
import { openModal } from "../AuthModals/AuthContainer";


const AuthButtons = () => {
    const {state} = useContext(UserContext);
    const {user} = state;

    const handleLogout = async() => {
        await logout(); 
    }
    return ( 
        <>
            {user.isAuthenticated && (
                <>
                    <Link className={styles.liked_link} to='/search/liked'>Liked Recipes</Link>
                    <button className={[styles.auth_button, styles.filled].join(" ")} onClick={handleLogout}>Logout</button>
                </>
            )}
            {!user.isAuthenticated && (
                <>
                    <button className={styles.auth_button} onClick={()=>openModal('login')}>Login</button>
                    <button className={[styles.auth_button, styles.filled].join(" ")} onClick={()=>openModal('signup')}>Sign Up</button>
                </>
            )}                    
        </>
    );
}
 
export default AuthButtons;