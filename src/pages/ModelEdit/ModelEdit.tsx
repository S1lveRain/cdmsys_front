import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useGetModelQuery} from "../../app/api/ModelsApi";
import styles from './ModelEdit.module.css'
import {ModelObject} from "../../components/ModelObject/ModelObject";
import {Alert, InputAdornment, TextField, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const ModelEdit = () => {
    const {modelName} = useParams();

    const {data} = useGetModelQuery(modelName);

    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('');

    useEffect(() => {
        setTimeout(() => {
            setSuccess(false);
            setError(false)
        }, 5000);
    }, [success, error]);


    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };


    return (
        <>
            {
                success && (
                    <Alert onClose={() => {
                        setSuccess(false)
                    }}>Операция выполнена успешно!</Alert>
                )
            }
            {
                error && (
                    <Alert severity={'error'} onClose={() => {
                        setError(false)
                    }}>Произошла ошибка! Для более подробной информации проверьте консоль</Alert>
                )
            }
            <div className={styles.searchBarContainer}>
                <TextField
                    label="Поиск"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

            </div>
            <div className={styles.objectsListContainer}>
                <div className={styles.objectsListWrapper}>
                    {data &&
                        data
                            .filter((el: any) => {
                                const nameToCheck = el.name || '';
                                const titleToCheck = el.title || '';
                                return (
                                    nameToCheck.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    titleToCheck.toLowerCase().includes(searchTerm.toLowerCase())
                                );
                            })
                            .map((el: any) => {
                                return (
                                    <ModelObject
                                        key={el.id}
                                        modelName={modelName}
                                        id={el.id}
                                        name={el.name === undefined ? el.title : el.name}
                                        setError={setError}
                                        setSuccess={setSuccess}
                                    />
                                );
                            })}
                </div>
            </div>

        </>
    );
};