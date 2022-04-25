import SkeletonElement from "./SkeletonElement";
import styles from './Skeleton.module.css';

const SkeletonCard = () => {
    return ( 
        <div className={styles.skeleton_wrapper}>
            <div className={styles.skeleton_card}>
                <SkeletonElement type='image' />
                <SkeletonElement type='title' />
                <SkeletonElement type='text' />
                <SkeletonElement type='text' />
                <SkeletonElement type='button' />
            </div>
        </div>
     );
}
 
export default SkeletonCard;