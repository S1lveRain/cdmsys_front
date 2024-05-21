import React from 'react';
import {Model} from '../../components/Model/Model';
import styles from './Home.module.css'
import {useGetModelsQuery} from "../../app/api/ModelsApi";
import Stack from '@mui/material/Stack';
import {FormControl, FormControlLabel, FormLabel, Paper, Radio,
    RadioGroup, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {RootState} from "../../app/Store";


export const Home = () => {
    const {data, isLoading} = useGetModelsQuery('');

    const [isOpen, setIsOpen] = React.useState(false);

    const isDarkMode = useSelector((state: RootState) => state.theme.darkMode);

    let arr = Array.from({length: 6}, (_, idx) => `${++idx}`)

    const handleOpen = () => setIsOpen(!isOpen);

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: isDarkMode ? '#121212' : '#fff',
        border: isDarkMode ? '2px solid rgba(255, 255, 255, 0.12)' : '2px solid rgba(0, 0, 0, 0.12)',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 5
    };

    return (
        <div className={styles.homeContainer}>
            <h3>Все модели</h3>
            {
                isLoading ? (
                    <div className={styles.loadingContainer}>
                        <Stack spacing={2}>
                            {
                                arr.map(() => {
                                    return (<Skeleton style={{height: 100, width: '80vw'}} variant={'rectangular'}/>)
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
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant={'contained'} style={{width: '80vw'}} onClick={handleOpen}>Создать отчёт</Button>
            </div>
            <Modal open={isOpen}
                   onClose={handleOpen}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <Box sx={modalStyle}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Период</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue="week"
                        >
                            <FormControlLabel value="week" control={<Radio />} label="Неделя" />
                            <FormControlLabel value="twoWeeks" control={<Radio />} label="Две недели" />
                            <FormControlLabel value="month" control={<Radio />} label="Месяц" />
                        </RadioGroup>
                    </FormControl>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button onClick={handleOpen} variant={'contained'}>Закрыть</Button>
                </Box>
            </Modal>
        </div>
    );
};