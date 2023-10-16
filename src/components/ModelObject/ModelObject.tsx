import React, { FC } from 'react';
import Button from "@mui/material/Button";
import {useDeleteModelObjectMutation} from "../../app/api/ModelsApi";
import styles from './ModelObject.module.css'

interface ModelObjectI {
    modelName: string | undefined;
    id: string;
    name: string;
}

export const ModelObject:FC<ModelObjectI> = ({modelName, id, name}) => {

    const [deleteObject] = useDeleteModelObjectMutation();
    const handleDeleteObject = async (id: string, modelName: string) => {
        try {
            await deleteObject({modelName, id})
        } catch (error) {}
    };

    return (
        <div className={styles.itemWrapper}>
            <div className={styles.itemContainer}>
                <div>
                    <h4>{name}</h4>
                </div>
                <div className={styles.itemActions}>
                    <Button variant={'contained'} color={'warning'}>Редактировать</Button>
                    <Button variant={'contained'} color={'error'} onClick={() => modelName && handleDeleteObject(id, modelName)}>Удалить</Button>
                </div>
            </div>
        </div>
    );
};