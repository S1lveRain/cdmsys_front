import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import {Item} from '../../components/Item/Item';
import {useParams} from "react-router-dom";
import {modelsApi, useGetDevModelQuery, useGetModelQuery} from "../../app/api/ModelsApi";
import styles from "../../components/Item/Item.module.css";
import {TextField} from "@mui/material";



export const ModelEdit = () => {
    const {modelName} = useParams();

    const {data} = useGetModelQuery(modelName);

    return (
        <div className={styles.listItemContainer}>
            {data && data.map((el: any) => {
                return (
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemContainer}>
                            <div>
                                <h4>{el.name === undefined ? el.title : el.name}</h4>

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

    );
};