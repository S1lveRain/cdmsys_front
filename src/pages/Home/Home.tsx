import React from 'react';
import {Model} from '../../components/Model/Model';
import styles from './Home.module.css'
import {useGetModelsQuery} from "../../app/api/ModelsApi";
import Stack from '@mui/material/Stack';

export const Home = () => {
    const {data} = useGetModelsQuery('');
    return (
        <div className={styles.homeContainer}>
            <h3>Все модели</h3>
            {data && data.map((el: any) => {
                return (
                    <>
                        <Stack spacing={2}>
                            <div className={styles.homeWrapper}>
                                <Model name={el.modelName} count={el.count}/>
                            </div>
                        </Stack>
                    </>
                )
            })}
        </div>
    );
};