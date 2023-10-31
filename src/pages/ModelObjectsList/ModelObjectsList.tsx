import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useGetDevModelQuery, useGetModelQuery, useGetModelsQuery} from "../../app/api/ModelsApi";
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
    Skeleton,
    ToggleButtonGroup, ToggleButton, Grid
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../app/Store";
import {setView} from "../../app/slices/dataViewSlice";
import Stack from "@mui/material/Stack";
import TableChartIcon from '@mui/icons-material/TableChart';
import GridViewIcon from '@mui/icons-material/GridView';


export const ModelObjectsList = () => {
    const {modelName} = useParams();
    const dispatch = useDispatch();
    const {data} = useGetModelQuery(modelName);

    const {data: devModelsList, isLoading: isModelsLoading} = useGetModelsQuery('');

    const {data: devModel, isLoading} = useGetDevModelQuery(modelName);

    const view = useSelector((state: RootState) => state.dataView.view);

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

    const handleChangeView = (event: any, newAlignment: any) => {
        if (newAlignment !== null) {
            dispatch(setView(newAlignment));
        }
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
            <div className={styles.optionsWrapper}>
                <div className={styles.optionsContainer}>
                    <div>
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
                    <div className={styles.switchViewContainer}>
                        <ToggleButtonGroup
                            color="primary"
                            value={view}
                            exclusive
                            onChange={handleChangeView}
                            aria-label="Platform"
                            size={'small'}
                        >
                            <ToggleButton value="table">
                                <IconButton size={'small'}>
                                    <TableChartIcon color={'primary'}/>
                                </IconButton>
                            </ToggleButton>
                            <ToggleButton value="card">
                                <IconButton size={'small'}>
                                    <GridViewIcon color={'primary'}/>
                                </IconButton>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>
            </div>
            <div className={styles.objectsListContainer}>
                {
                    view === 'table' ? (
                        <>
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
                                                        {devModel &&
                                                            devModel.fields.map((el: any) => {
                                                                const modelMatch = !isModelsLoading && devModelsList.find((model: any) => model.modelName.toLowerCase() === el.fieldName);
                                                                const label = modelMatch ? modelMatch.modelLabel : el.label || el.fieldName;

                                                                return (
                                                                    <TableCell key={el.fieldName}>
                                                                        {el.fieldName === 'createdAt'
                                                                            ? 'Создано'
                                                                            : el.fieldName === 'updatedAt'
                                                                                ? 'Изменено'
                                                                                : label}
                                                                    </TableCell>
                                                                );
                                                            })}


                                                        <TableCell>Действия</TableCell>
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
                        </>
                    ) : (
                        isLoading ? (
                            <div className={styles.loadingContainer}>
                                <Stack flexDirection={'row'} flexWrap={'wrap'} gap={'15px'} justifyContent={'center'}>
                                    {
                                        arr.map(() => {
                                            return (
                                                <Skeleton style={{height: 236, width: 345}} variant={'rectangular'}/>)
                                        })
                                    }
                                </Stack>
                            </div>
                        ) : (
                            <Grid container spacing={2}>
                                {filteredData.map((el: any) => (
                                    <Grid item xs={12} sm={6} md={3} lg={2} key={el.id}>
                                        <ModelObject
                                            modelName={modelName}
                                            id={el.id}
                                            name={el.name === undefined ? el.title : el.name}
                                            setError={setError}
                                            setSuccess={setSuccess}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    )
                }
            </div>
        </>
    );
};