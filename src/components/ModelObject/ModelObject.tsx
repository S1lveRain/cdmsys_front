import React, {FC} from 'react';
import Button from "@mui/material/Button";
import {
    useDeleteModelObjectMutation,
    useGetDevModelQuery,
    useGetOneModelObjectQuery,
    useUpdateModelObjectMutation
} from "../../app/api/ModelsApi";
import styles from './ModelObject.module.css'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    IconButton,
    TableCell,
    TableRow,
    TextField
} from "@mui/material";
import {useSelector, useDispatch} from 'react-redux';
import {editFormData, clearFormData, selectFormData} from '../../app/slices/formDataSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ModelObjectI {
    modelName: string | undefined;
    id: string;
    name: string;
    setError: any;
    setSuccess: any;
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

export const ModelObject: FC<ModelObjectI> = ({modelName, id, name, setError, setSuccess}) => {
    const {data: object} = useGetOneModelObjectQuery({modelName, id});
    const [deleteObject] = useDeleteModelObjectMutation();
    const [updateObject] = useUpdateModelObjectMutation();
    const handleDeleteObject = async (id: string, modelName: string) => {
        try {
            await deleteObject({modelName, id});
            setSuccess(true)
        } catch (error) {
            setError(true)
        }
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {data: devModel, isLoading} = useGetDevModelQuery(modelName);

    const dispatch = useDispatch();
    const fieldValues = useSelector(selectFormData);

    const handleFieldChange = (fieldName: string, value: string) => {
        const data = {[fieldName]: value};
        dispatch(editFormData({data}));
    };


    const handleSave = () => {
        try{
            updateObject({id: id, modelName: modelName, body: fieldValues});
            dispatch(clearFormData());
            handleClose();
            setSuccess(true)
        } catch(error) {
            setError(true)
        }

    };

    return (
        <>
            <TableRow>
                {modelName &&
                    !isLoading &&
                    devModel.fields &&
                    devModel.fields.map((el: any) => {
                        return (
                            <TableCell key={el.fieldName}>
                                {object?.[el.fieldName]}
                            </TableCell>
                        );
                    })}
                <TableCell>
                    <IconButton aria-label="edit" color="primary" onClick={() => handleOpen()}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" onClick={() => modelName && handleDeleteObject(id, modelName)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Редактировать элемент
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: 15, padding: 10}}>
                            {modelName && !isLoading && devModel.fields && devModel.fields.map((el: any) => {
                                if (el.fieldName === 'id' || el.fieldName === 'createdAt' || el.fieldName === 'updatedAt') {
                                    return null;
                                }
                                return (
                                    <div key={el.fieldName}>
                                        <TextField
                                            id={el.fieldName}
                                            label={el.fieldName}
                                            variant="outlined"
                                            defaultValue={object?.[el.fieldName] || ''}
                                            onChange={(e) => handleFieldChange(el.fieldName, e.target.value)}
                                            size={'medium'}
                                            fullWidth
                                        />
                                    </div>
                                );
                            })}
                            <Button variant={'outlined'} size={'large'} onClick={handleSave}>Сохранить</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};
