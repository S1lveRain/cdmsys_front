import React, {FC} from 'react';
import {Link, useParams} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {useGetDevModelQuery} from "../app/api/ModelsApi";

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

const Header: FC = () => {

    const {modelName} = useParams();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {data: devModel, isLoading} = useGetDevModelQuery(modelName);

    return (
        <>
            <header>
                <Link to="/">
                    <AiOutlineHome color={'black'} size={24}/>
                </Link>
                {modelName && <Button variant="contained" size={'small'} onClick={handleOpen}>+</Button>
                }
            </header>
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
                            {modelName && !isLoading && devModel.fields && devModel.fields.map((el: any) => {
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
        </>

    );
};

export default Header;