import Paper from '@mui/material/Paper';
import React, {FC} from 'react';
import {Link} from "react-router-dom";
import styles from './Model.module.css'

interface ItemI {
    name: string,
    count?: string
}

export const Model: FC<ItemI> = ({name, count}) => {
    return (
        <Paper elevation={3}>
            <Link to={`/model/${name}`} className={styles.itemName}>
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
        </Paper>
    );
};