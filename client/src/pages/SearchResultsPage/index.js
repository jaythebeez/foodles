import { useEffect, useLayoutEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import useFetch from "../../customHooks/useFetch";
import RecipeCard from "../../components/RecipeCard";
import styles from './searchresultspage.module.css';
import Modal from "../../components/Modal/Modal";
import SkeletonCard from "../../components/Skeletons/SkeletonCard";
import { toast } from "react-toastify";
import { onSnapshot, where, query } from 'firebase/firestore';
import { colRef } from '../../contexts/firebase/store';
import { UserContext } from "../../contexts/UserContext";
import LogIn from "../../components/AuthModals/Login";
import SignUp from "../../components/AuthModals/Signup";

const SearchResultsPage = ({handleAuthModal, authModal}) => {
    const apiKey = process.env.REACT_APP_SPOONACULAR_API;
    const api = `apiKey=${apiKey}`;
    const { query: routerQuery } = useParams();// get query from url
    const resultsDisplayed = 15; // number of results to display on page
    const [page, setPage] = useState(1);// page of results displayed
    const [offset, setOffset] = useState(0);
    const {data, isPending, error} = useFetch(`https://api.spoonacular.com/recipes/complexSearch?query=${routerQuery}&${api}&addRecipeInformation=true&number=${resultsDisplayed}&offset=${offset}`);
    const [modal, setModal] = useState({isOpen:false});
    const [results,setResults] = useState(null);
    const [numOfResults, setNumOfResults] = useState(0);//number of results gotten from api request
    const [userData, setUserData] = useState({docId: null, likedRecipes:[]})
    const {state} = useContext(UserContext); //get state details from context
    const {user} = state; //get user details from state
    

    //functions to open and close modal
    const openModal = (id) =>  setModal({isOpen:true, id});
    const closeModal = () => setModal({isOpen:false});

    //function to handle pagination 
    const handlePage = (type) => {
        if (type === 'prev'){
            //if page is not first page load previous page
            if( page > 1 ) setPage(page => page - 1);
        }
        if(type === 'next'){
            //if there are results left to view load next page
            if(offset + resultsDisplayed >=! numOfResults){
                setPage(page => page + 1);
            }
        }
    }
    
    const scrollToTop = () => window.scroll({top:0, left:0, behaviour:'smooth'})
    
    useEffect(()=>{
        //set initial pagination page to 1 every time the query gets changed
        setPage(1);
    },[routerQuery])

    useLayoutEffect(()=>{
        //if data is present parse the data into state 
        data && setResults(data.results);   
        data && setNumOfResults(data.totalResults);
        scrollToTop();
    },[data]);

    useEffect(()=>{
        //set offset of results to be retrieved from api 
        setOffset((page-1) * resultsDisplayed);
    },[page])

    useEffect(()=>{
        //if there is ever any error send the error information to the user
        error && toast('There was an error, retrying now');
    },[error])
      
    useEffect(()=>{
        //clear the results any time the offset or query changes
        setResults(null);
    },[routerQuery, offset])

    useEffect(() => {
        //if user is authenticated pass user data to all recipe cards 
        if(user.isAuthenticated){
            const q = query(colRef, where('uid', '==', user.data.uid))
            onSnapshot(q, (snapshot)=>{
                let likes = [];
    
                snapshot.docs.forEach(doc=>{
                    likes.push({...doc.data(), docId:doc.id})
                })

                if(likes.length){
                    setUserData({likedRecipes: [...likes[0].likedRecipes], docId:likes[0].docId})
                }
            })
        }
        else{
            //set list of liked recipes to be an empty array
            
            setUserData({docId: null, likedRecipes:[]})
        }
    },[user])
    
    return ( 
        <>
            {isPending && (
                <div className={styles.page_container}>
                    <div className={styles.grid_container}>
                        {[1,2,3,4,5,6,7,8,9,10].map(n=>(
                            <SkeletonCard key={n} />
                        ))}
                    </div>
                </div>
            )}
            {results && (
                <div className={styles.page_container}>
                    <div className={styles.grid_container}>
                        {results.map(recipe => (
                            <RecipeCard recipe={recipe} userData={userData} openModal={openModal} key={recipe.id}  />
                        ))}
                    </div>
                    {numOfResults > 15 && (
                        <div className={styles.btn_container}>
                            <span><button onClick={()=>handlePage('prev')}>Prev</button></span>
                            <span>{page}</span>
                            <span><button onClick={()=>handlePage('next')}>Next</button></span>
                        </div>
                    )}
                </div>
            )}

            {modal.isOpen && <Modal closeModal={closeModal} id={modal.id} userData={userData}/>}
            {authModal.login && <LogIn handleAuthModal={handleAuthModal} />}
            {authModal.signUp && <SignUp handleAuthModal={handleAuthModal} />}
        </>
    );
}
 
export default SearchResultsPage;