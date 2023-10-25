import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useGetDevModelQuery, useGetModelQuery} from "../../app/api/ModelsApi";
import styles from './ModelObjectsList.module.css'
import {ModelObject} from "../../components/ModelObject/ModelObject";
import {
    Alert,
    InputAdornment,
    TextField,
    IconButton,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Table,
    Paper,
    Skeleton
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const ModelObjectsList = () => {
    const {modelName} = useParams();

    const {data} = useGetModelQuery(modelName);

    const {data: devModel, isLoading} = useGetDevModelQuery(modelName);

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

    const filteredData = data
        ? data.filter((el: any) => {
            const modelNameToSearch = el.name || el.title || '';
            return modelNameToSearch.toLowerCase().includes(searchTerm.toLowerCase());
        })
        : [];

    let arr = Array.from({length: 5}, (_, idx) => `${++idx}`)

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
                <Paper style={{width: '100%'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    isLoading ? (
                                        arr.map(() => (
                                            <TableCell>
                                                <Skeleton animation="wave" variant="text"/>
                                            </TableCell>
                                        ))
                                    ) : (
                                        <>
                                            {devModel && devModel.fields.map((el: any) => (
                                                <TableCell key={el.fieldName}>
                                                    {el.fieldName === 'createdAt' ? 'Создано' : el.fieldName === 'updatedAt' ? 'Изменено' : (el.label ? el.label : el.fieldName)}
                                                </TableCell>
                                            ))}
                                            <TableCell> Действия </TableCell>
                                        </>
                                    )
                                }

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                isLoading ? (
                                    arr.map(() => (
                                        <TableRow>
                                            {arr.map(() => (
                                                <TableCell component="th" scope="row">
                                                    <Skeleton animation="wave" variant="text"/>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    filteredData.map((el: any) => (
                                        <ModelObject
                                            key={el.id}
                                            modelName={modelName}
                                            id={el.id}
                                            name={el.name === undefined ? el.title : el.name}
                                            setError={setError}
                                            setSuccess={setSuccess}
                                        />
                                    ))
                                )
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>

        </>
    )
        ;
};