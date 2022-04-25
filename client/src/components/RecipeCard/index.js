import styles from './recipecard.module.css';
import LikeButton from '../LikeButton/LikeButton';
import person from '../../assets/images/person.svg';
import clock from '../../assets/images/clock.svg';


const RecipeCard = ({recipe, openModal, userData}) => {

    return ( 
        <div className={styles.recipe_card} >
            <div className={styles.img_container} onClick={()=>openModal(recipe.id)}>
                <img src={recipe.image} alt={recipe.title} className={styles.food_image} />    
            </div> 
            <div className={styles.recipe_details}>
                <div className={styles.card_header}>
                    <div className={styles.recipe_icons}>
                        <span><img src={clock} alt='' />{recipe.readyInMinutes} Mins</span>
                        <span><img src={person} alt='' />{recipe.servings}</span>
                    </div>
                    <LikeButton id={recipe.id} userData={userData} />
                </div>
                <div className={styles.recipe_title_container}>
                    <span className={styles.recipe_title}>{recipe.title}</span>
                </div>
                <div className={styles.card_footer}>
                    <button className={styles.card_btn} onClick={()=>openModal(recipe.id)}>View Recipe</button>
                </div>
            </div>
        </div>
    );
}
 
export default RecipeCard;