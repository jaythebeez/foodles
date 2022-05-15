import { Routes, Route } from "react-router";
import Navbar from '../components/Navbar'
import SearchResultsPage from "./SearchResultsPage";
import LikedResultsPage from "./SearchResultsPage/LikedRecipesPage";
import { useState } from "react";


const Search = () => {
    // const [authModal, setAuthModal] = useState({login:false, signUp:false});

    // const handleAuthModal = (input) => {
    //     if (input === 'login') setAuthModal({login:true, signUp:false});
    //     if (input === 'signup') setAuthModal({login:false, signUp:true});
    //     if (input === 'close') setAuthModal({login:false, signUp:false});
    // }

    return ( 
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path='/liked' element={<LikedResultsPage />} />
                    <Route path= "/query/:query" element={<SearchResultsPage />}/>                   
                </Routes>
            </main>

        </>
    );
}
 
export default Search;