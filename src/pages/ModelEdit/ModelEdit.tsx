import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import { Item } from '../../components/Item/Item';
import {useParams} from "react-router-dom";
import {useGetModelQuery} from "../../app/api/ModelsApi";
import styles from "../../components/Item/Item.module.css";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.#1e1e1e',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ModelEdit = () => {
    const {modelName} = useParams();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data } = useGetModelQuery(modelName);
    console.log(data)

    return (
        <div className={styles.listItemContainer}>
            {data && data.map((el: any) => {
                return(
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
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>

    );
};