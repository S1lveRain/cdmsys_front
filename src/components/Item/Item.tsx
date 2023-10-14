import React from 'react';
import {Link} from "react-router-dom";
import styles from './Item.module.css'

export const Item = () => {
    return (
        <Link to={'/item/'} className={styles.itemName}>
        <div className={styles.itemWrapper}>

                <div className={styles.itemContainer}>
                    <div>
                            <h4>Имя</h4>

                    </div>
                    <div className={styles.itemCount}>
                        Всего: 0
                    </div>
                </div>
        </div>
        </Link>
    );
};