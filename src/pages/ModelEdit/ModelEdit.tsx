import React from 'react';
import {useParams} from "react-router-dom";
import {useGetModelQuery} from "../../app/api/ModelsApi";
import styles from './ModelEdit.module.css'
import {ModelObject} from "../../components/ModelObject/ModelObject";
import {Alert} from "@mui/material";



export const ModelEdit = () => {
    const {modelName} = useParams();

    const {data} = useGetModelQuery(modelName);

    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)

    return (
        <>
            {
                success && (
                    <Alert onClose={() => {
                        setSuccess(false)}}>Операция выполнена успешно!</Alert>
                )
            }
            {
                error && (
                    <Alert severity={'error'} onClose={() => {setError(false)}}>Произошла ошибка! Для более подробной информации проверьте консоль</Alert>
                )
            }
        <div className={styles.objectsListContainer}>
            <div className={styles.objectsListWrapper}>
                {data && data.map((el: any) => {
                    return (
                        <ModelObject modelName={modelName} id={el.id} name={el.name === undefined ? el.title : el.name} setError={setError} setSuccess={setSuccess}/>
                    );
                })}
            </div>
        </div>
        </>

    );
};