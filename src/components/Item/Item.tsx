import React, { FC } from 'react';
import {Link} from "react-router-dom";
import styles from './Item.module.css'

interface ItemI {
    name: string,
    count: string
}
export const Item:FC<ItemI> = ({name, count}) => {
    return (
        <Link to={'/item/'} className={styles.itemName}>
        <div className={styles.itemWrapper}>

                <div className={styles.itemContainer}>
                    <div>
                            <h4>{name}</h4>

                    </div>
                    <div className={styles.itemCount}>
                        Всего: {count}
                    </div>
                </div>
        </div>
        </Link>
    );
};