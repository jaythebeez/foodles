import styles from './landingpage.module.css';
import SearchForm from '../../components/SearchForm';
import AuthButtons from '../../components/AuthButtons'

const LandingPage = () => {
    return ( 
        <main>
            <div className={styles.page_header}>
                <AuthButtons />
            </div>
            <div className={styles.page_container}>

                <div className={styles.page_content}>
                    <h1 className={styles.landing_text}>Foodle</h1>
                    <SearchForm />
                </div>
            </div>
        </main>
    );
}
 
export default LandingPage;