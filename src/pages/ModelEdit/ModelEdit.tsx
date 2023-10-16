import React from 'react';
import {useParams} from "react-router-dom";
import {useGetModelQuery} from "../../app/api/ModelsApi";
import styles from './ModelEdit.module.css'
import {ModelObject} from "../../components/ModelObject/ModelObject";



export const ModelEdit = () => {
    const {modelName} = useParams();

    const {data} = useGetModelQuery(modelName);

    return (
        <div className={styles.objectsListWrapper}>
            {data && data.map((el: any) => {
                return (
                    <ModelObject modelName={modelName} id={el.id} name={el.name === undefined ? el.title : el.name}/>
                );
            })}
        </div>

    );
};