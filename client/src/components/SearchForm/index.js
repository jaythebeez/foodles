import { useState } from 'react';
import styles from './searchform.module.css';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const SearchForm = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(query.match(/^[A-Za-z]+$/)){
            navigate(`/search/query/${query}`, { replace:true , query});
        }
        else{
            toast.error('query must not contain string or special characters')
        }
    }


    return ( 
        <form onSubmit={handleSubmit}>
            <div className={styles.search_form}>
                <input type="search" placeholder='Search your favorite recipes...' className={styles.search_bar} value={query} onChange={handleChange} required/>
                <div className={styles.btn_container}>
                    <input type='submit' className={styles.search_btn} value='Search Recipes' />
                    <button className={[styles.search_btn, styles.extra_btn].join(' ')}>Random Search</button>
                </div>
            </div>
        </form>
     );
}
export default SearchForm;