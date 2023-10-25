import React from 'react';
import {Model} from '../../components/Model/Model';
import styles from './Home.module.css'
import {useGetModelsQuery} from "../../app/api/ModelsApi";
import Stack from '@mui/material/Stack';
import {Skeleton} from "@mui/material";


export const Home = () => {
    const {data, isLoading} = useGetModelsQuery('');

    let arr = Array.from({ length: 6 }, (_, idx) => `${++idx}`)

    return (
        <div className={styles.homeContainer}>
            <h3>Все модели</h3>
            {
                isLoading ? (
                    <div className={styles.loadingContainer}>
                        <Stack spacing={2}>
                            {
                                arr.map(() => {
                                    return(<Skeleton style={{height: 100, width: '80vw'}}/>)
                                })
                            }
                        </Stack>
                    </div>
                ) : (
                    <div>
                        {data && data.map((el: any) => {
                            return (
                                <>
                                    <Stack spacing={2}>
                                        <div className={styles.homeWrapper}>
                                            <Model label={el.modelLabel} name={el.modelName} count={el.count}/>
                                        </div>
                                    </Stack>
                                </>
                            )
                        })}
                    </div>
                )
            }
        </div>
    );
};