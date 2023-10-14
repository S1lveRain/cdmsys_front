import React from 'react';
import { Item } from '../../components/Item/Item';
import styles from './Home.module.css'
import {useGetGroupsQuery} from "../../app/api/ItemsApi";

export const Home = () => {


    return (
        <div className={styles.homeWrapper}>
            <Item name={'Антон'} count={'10'} />
        </div>
    );
};