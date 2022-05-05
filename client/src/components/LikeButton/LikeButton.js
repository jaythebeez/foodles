import styles from './like-button.module.css';
import { doc, updateDoc, arrayUnion, arrayRemove, where, query, onSnapshot, getDoc, increment, writeBatch } from 'firebase/firestore';
import { db, recipeColRef } from '../../contexts/firebase/store';
import {  useEffect, useState, useContext  } from 'react';
import { UserContext } from "../../contexts/UserContext";
import { toast } from 'react-toastify';
import shortNumber from "short-number";


const LikeButton = ({ id, userData }) => {
    const [liked, setLiked] = useState(false);
    const [recipeData, setRecipeData] = useState({likesCount:0, recipe_id:id, likedByUsers:[]});
    const { state } = useContext(UserContext);
    const { user } = state;
    const {likedRecipes, docId} = userData;
    const [animation, setAnimation] = useState(0);
    
    const handleClick = async (id) => {

        if(user.isAuthenticated && user.data && recipeData){
            try{
                const userRef = doc(db, 'users', docId);
                const recipeRef = doc(db, 'recipes', `${id}`);

                const recipeDoc = await getDoc(recipeRef);

                const batch = writeBatch(db);

                if(likedRecipes.includes(id)){
                    batch.update(userRef, {
                        likedRecipes: arrayRemove(id),
                        last_update: {
                            type:"remove_like",
                            payload: id
                        }
                    })
                    if(recipeDoc.exists()){
                        batch.update(recipeRef,{
                            likedByUsers: arrayRemove(docId),
                            likesCount: increment(-1)
                        })
                    }
                    else {
                        batch.set(recipeRef, {
                            recipe_id: id,
                            likedByUsers: [],
                            likesCount: 0
                        })
                    }             
                }
                if(!likedRecipes.includes(id)){
                    batch.update(userRef, {
                        likedRecipes: arrayUnion(id),
                        last_update: {
                            type:"add_like",
                            payload: id
                        }
                    })
                    if(recipeDoc.exists()){
                        batch.update(recipeRef,{
                            likedByUsers: arrayUnion(docId),
                            likesCount: increment(1)
                        })
                    }
                    else {
                        batch.set(recipeRef, {
                            recipe_id: id,
                            likedByUsers: [docId],
                            likesCount: 1
                        })
                    }
                }
                await batch.commit();
            }
            catch (e) {
                toast("Like update failed: ", e);
            } 
        }
        else{
            toast('You have to be logged in to like recipes');
        }
    }

    useEffect(()=>{
        if(likedRecipes.length > 0){
            if(likedRecipes.indexOf(id) !== -1) setLiked(true);
            else setLiked(false);
        }
        else setLiked(false);
    },[likedRecipes])

    useEffect(()=>{
        const recipeQuery = query(recipeColRef, where('recipe_id', '==', id));
        onSnapshot(recipeQuery, (snapshot)=>{

            let recipes = [];

            snapshot.docs.forEach(doc=>{
                recipes.push({...doc.data(), docId:doc.id})
            })

            if(recipes.length){
                setRecipeData({...recipes[0]})
            }
        })
    },[liked])

    return ( 
        <span className={styles.like_button} onClick={()=>handleClick(id)}>
            <span className={styles.like_icon}>
                {liked &&   <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#E92234">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                }
                {!liked &&   <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 0 24 24" width="30px" fill="#000000">
                                <path d="M0 0h24v24H0V0z" fill="none"/>
                                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
                            </svg>
                }
            </span>
            <span className={styles.like_count}> {shortNumber(recipeData.likesCount)}</span>
        </span>
    );
}
 
export default LikeButton;