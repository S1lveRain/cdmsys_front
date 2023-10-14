import React from 'react';
import { Item } from '../../components/Item/Item';
import styles from './Home.module.css'

export const Home = () => {
    return (
        <div className={styles.homeWrapper}>
            <Item />
        </div>
    );
};