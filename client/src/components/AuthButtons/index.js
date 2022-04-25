import { UserContext } from "../../contexts/UserContext";
import { logout } from "../../contexts/firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from './authbuttons.module.css'


const AuthButtons = ({handleAuthModal}) => {
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
                    <button className={styles.auth_button} onClick={handleLogout}>Logout</button>
                </>
            )}
            {!user.isAuthenticated && (
                <>
                    <button className={styles.auth_button} onClick={()=>handleAuthModal('login')}>Login</button>
                    <button className={styles.auth_button} onClick={()=>handleAuthModal('signup')}>Sign Up</button>
                </>
            )}                    
        </>
    );
}
 
export default AuthButtons;