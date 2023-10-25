import Paper from '@mui/material/Paper';
import React, {FC} from 'react';
import {Link} from "react-router-dom";
import styles from './Model.module.css'
import {RootState} from "../../app/Store";
import {useSelector} from 'react-redux';

interface ItemI {
    name: string,
    count?: string,
    label: string,
}

export const Model: FC<ItemI> = ({name, count, label}) => {

    const isDarkMode = useSelector((state: RootState) => state.theme.darkMode);

    return (
        <Paper elevation={3}>
            <Link to={`/model/${name}`} className={styles.itemName}
                  style={isDarkMode ? {color: 'white'} : {color: 'black'}}>
                <div className={styles.itemWrapper}>
                    <div className={styles.itemContainer}>
                        <div>
                            <h4>{label}</h4>

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