import { useEffect, useState } from 'react';
import LikeButton from '../LikeButton/LikeButton';
import useFetch from '../../customHooks/useFetch';
import styles from './modal.module.css';
import Loader from '../Loader';


const Modal = ({closeModal, id, userData}) => {
    const apiKey = process.env.REACT_APP_SPOONACULAR_API;
    const key = `apiKey=${apiKey}`;
    const {data, isPending} = useFetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&${key}`);
    const [results, setResults] = useState(null);
    


    useEffect(()=>{
        if (data){
            const title = data.title;
            const image = data.image;
            const instructions = data.analyzedInstructions[0].steps.map(step=>step.step);
            const ingredients = data.extendedIngredients.map(ing=>`${ing.measures.us.amount} ${ing.measures.us.unitShort} ${ing.nameClean}`)
            const url = data.sourceUrl;
            const summary = {__html: data.summary}
            setResults({title,image,instructions,ingredients,url,summary})
        }
    },[data]);

    const handleClick = (event) => {
        event.stopPropagation();
    }

    return ( 
        <>
            {results && (
                        <div className={styles.modal} onClick={closeModal}>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                            <div className={styles.modal_content} onClick={handleClick}>
                                <div className={styles.modal_grid}>
                                    <div className={styles.modal_header}>
                                        <img src={data.image} alt={data.title} />
                                        <div className={styles.add_libs}>
                                            <div className={styles.libs_end}>
                                            <LikeButton type={false} userData={userData} id={id}/>
                                            </div>                      
                                        </div>
                                        <h1>{data.title}</h1>
                                        <p dangerouslySetInnerHTML={results.summary}></p>
                                    </div>
                                    <div className={styles.food_ingredients}>
                                        <h2>Ingredients</h2>
                                        <ul>
                                            {results.ingredients.map((ing,i)=>(
                                                <li key={i}>{ing}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.cooking_instructions}>
                                        <h2>Instructions</h2>
                                        <ul>
                                            {results.instructions.map((ins,i)=>(
                                                <li key={i}>{ins}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles.modal_buttons}>
                                    <button><a href={results.url} target="_blank" rel="noreferrer">To Official Website</a></button>
                                </div>
                            </div>
                        </div>
            )}
            {isPending && (
                <Loader />
            )}
        </>
    );
}
 
export default Modal;