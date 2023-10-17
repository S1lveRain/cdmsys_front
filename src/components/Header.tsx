import React, {FC} from 'react';
import {Link, useParams} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {useAddModelObjectMutation, useGetDevModelQuery} from "../app/api/ModelsApi";
import { useDispatch, useSelector } from 'react-redux';
import {clearFormData, selectFormData, setFormData} from "../app/slices/formDataSlice";

interface Field {
    fieldName: string;
}

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
    const formData = useSelector(selectFormData);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {data: devModel, isLoading} = useGetDevModelQuery(modelName);
    const [addObject] = useAddModelObjectMutation()


    const handleFieldChange = (fieldName: string, value: string) => {
        dispatch(setFormData({ [fieldName]: value }));
    };

    const handleAddButtonClick = async() => {
        try {
            await addObject({modelName: modelName, body: formData})
        } catch (error) {}
        dispatch(clearFormData());
        handleClose();
    };

    return (
        <>
            <header>
                <Link to="/">
                    <AiOutlineHome color={'black'} size={24}/>
                </Link>
                {
                    modelName && <Button variant="contained" size={'small'} onClick={handleOpen}>+</Button>
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
                            {modelName && !isLoading && devModel.fields && devModel.fields.map((el: Field) => {
                                if (el.fieldName === 'id' || el.fieldName === 'createdAt' || el.fieldName === 'updatedAt') {
                                    return null;
                                }
                                return (
                                    <div key={el.fieldName}>
                                        <TextField id="filled-basic" label={el.fieldName} variant="outlined"
                                                   size={'medium'} fullWidth
                                                   value={formData[el.fieldName] || ''}
                                                   onChange={(e) => handleFieldChange(el.fieldName, e.target.value)} />
                                    </div>
                                );
                            })}
                            <Button variant={'outlined'} size={'large'} onClick={handleAddButtonClick}>Добавить</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </>

    );
};

export default Header;