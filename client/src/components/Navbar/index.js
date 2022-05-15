import { Link } from "react-router-dom";
import SearchForm from "../SearchForm";
import styles from './navbar.module.css';
import menuBtn from '../../assets/images/menu.svg';
import closeBtn from '../../assets/images/close.svg';
import { useEffect, useState  } from "react";

import AuthButtons from "../AuthButtons";

const Navbar = ({handleAuthModal, authModal}) => {
    
    const [navOpen, setNavOpen] = useState( false );
     
    const toggleNavigation = () => setNavOpen(navOpen => !navOpen);

    // useEffect(()=>{
    //     if(authModal.login || authModal.signUp) setNavOpen(false);
    // }, [authModal])


    return ( 
        <header>
            <div className={styles.header_container}>
                <div className={styles.logo_container}>
                    <h2><Link to='/'>Foodle</Link></h2>
                </div>
                <div className={styles.nav_container}>
                    <SearchForm />
                    <nav>
                        <div className={styles.nav_icon}>
                            <img src={menuBtn} alt="Open Nav" onClick={toggleNavigation}/>
                        </div>
                        <div className={navOpen ? [styles.nav_links, styles.open].join(' ') : styles.nav_links }>
                            <div className={styles.close_icon}>
                                <img src={closeBtn} alt="Close Nav" onClick={toggleNavigation} />
                            </div>
                            <AuthButtons handleAuthModal={handleAuthModal} />
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
 
export default Navbar;