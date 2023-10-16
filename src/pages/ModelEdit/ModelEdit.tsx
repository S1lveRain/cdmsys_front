import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import {Item} from '../../components/Item/Item';
import {useParams} from "react-router-dom";
import {modelsApi, useDeleteModelObjectMutation, useGetDevModelQuery, useGetModelQuery} from "../../app/api/ModelsApi";
import styles from './ModelEdit.module.css'
import {TextField} from "@mui/material";



export const ModelEdit = () => {
    const {modelName} = useParams();

    const [deleteObject] = useDeleteModelObjectMutation();
    const handleDeleteObject = async (id: string, modelName: string) => {
        try {
            await deleteObject({modelName, id})
        } catch (error) {}
    };

    const {data} = useGetModelQuery(modelName);

    return (
        <div className={styles.itemListWrapper}>
            {data && data.map((el: any) => {
                return (
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemContainer}>
                            <div>
                                <h4>{el.name === undefined ? el.title : el.name}</h4>

                            </div>
                            <div className={styles.itemActions}>
                                <Button variant={'contained'} color={'warning'}>Редактировать</Button>
                                <Button variant={'contained'} color={'error'} onClick={() => modelName && handleDeleteObject(el.id, modelName)}>Удалить</Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

    );
};