import { useEffect, useLayoutEffect, useState, useContext } from "react";
import useFetch from "../../customHooks/useFetch";
import RecipeCard from "../../components/RecipeCard";
import styles from './searchresultspage.module.css';
import Modal from "../../components/Modal/Modal";
import SkeletonCard from "../../components/Skeletons/SkeletonCard";
import { toast } from "react-toastify";
import { onSnapshot, where, query } from 'firebase/firestore';
import { colRef } from '../../contexts/firebase/store';
import { UserContext } from "../../contexts/UserContext";
import {  useNavigate  } from 'react-router-dom'


const LikedResultsPage = () => {
    const api = 'apiKey=c41f29241c9c4c45aadf926791fc4a07'; 
    const [userData, setUserData] = useState({docId: null, likedRecipes:[]});
    const {data, isPending, error} = useFetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${userData.likedRecipes.join(',')}&${api}`);
    const [modal, setModal] = useState({isOpen:false});
    const [results,setResults] = useState(null);
    const {state} = useContext(UserContext); //get user details from context
    const {user} = state;
    const navigate = useNavigate();
    

    //functions to open and close modal
    const openModal = (id) =>  setModal({isOpen:true, id});
    const closeModal = () => setModal({isOpen:false});
    
    const scrollToTop = () => window.scroll({top:0, left:0, behaviour:'smooth'})

    useLayoutEffect(()=>{
        //if data is present parse the data into state 
        data && setResults(data);   
        scrollToTop();
    },[data]);

    useEffect(()=>{
        //if there is ever any error send the error information to the user
        error && toast('Error: ' + error)
    },[error])

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
            setUserData({docId: null, likedRecipes:[]});
            //navigate the user to homepage
            navigate('/');
            
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
                </div>
            )}

            {modal.isOpen && <Modal closeModal={closeModal} id={modal.id} userData={userData}/>}
        </>
    );
}
 
export default LikedResultsPage;