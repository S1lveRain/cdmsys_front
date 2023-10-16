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

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    border: '2px solid rgba(188, 188, 188, 0.7)',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

export const ModelEdit = () => {
    const {modelName} = useParams();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {data} = useGetModelQuery(modelName);

    const {data: devModel, isLoading} = useGetDevModelQuery(modelName);

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
            <Button variant="outlined" size={'large'} onClick={handleOpen}>+</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Новый элемент
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: 15, padding: 10}}>
                            {!isLoading && devModel.fields && devModel.fields.map((el: any) => {
                                return (
                                    <div>
                                        <TextField id="filled-basic" label={el.fieldName} variant="outlined"
                                                   size={'medium'} fullWidth/>
                                    </div>
                                );
                            })}
                            <Button variant={'outlined'} size={'large'}>Добавить</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>

    );
};