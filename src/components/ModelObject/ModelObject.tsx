import React, {FC} from 'react';
import {
    useDeleteModelObjectMutation,
    useGetDevModelQuery,
    useGetOneModelObjectQuery,
    useUpdateModelObjectMutation
} from "../../app/api/ModelsApi";
import styles from './ModelObject.module.css'
import {
    IconButton,
    TableCell,
    TableRow,
} from "@mui/material";
import {useSelector, useDispatch} from 'react-redux';
import {editFormData, clearFormData, selectFormData} from '../../app/slices/formDataSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CustomModal } from '../CustomModal/CustomModal';

interface ModelObjectI {
    modelName: string | undefined;
    id: string;
    name: string;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModelObject: FC<ModelObjectI> = ({modelName, id, name, setError, setSuccess}) => {

    const [openEditModal, setOpenEditModal] = React.useState(false);
    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    const {data: object} = useGetOneModelObjectQuery({modelName, id});
    const [deleteObject] = useDeleteModelObjectMutation();
    const [updateObject] = useUpdateModelObjectMutation();
    const handleDeleteObject = async (id: string, modelName: string) => {
        try {
            await deleteObject({ modelName, id }).unwrap();
            setSuccess(true);
        } catch (error: any) {
            if (error.originalStatus === 200) {
                setSuccess(true);
            } else {
                setError(true);
            }
        }
    };




    const {data: devModel, isLoading} = useGetDevModelQuery(modelName);

    const dispatch = useDispatch();
    const fieldValues = useSelector(selectFormData);

    const handleFieldChange = (fieldName: string, value: string) => {
        const data = {[fieldName]: value};
        dispatch(editFormData({data}));
    };

    function formatDateTime(dateString: string, fieldName: string) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        if (fieldName === 'createdAt' || fieldName === 'updatedAt') {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        } else {
            return `${day}.${month}.${year}`;
        }
    }

    const handleSave = () => {
        updateObject({id: id, modelName: modelName, body: fieldValues})
            .unwrap()
            .then(fulfilled => {
                setSuccess(true)
            })
            .catch(rejected => setError(true))
        dispatch(clearFormData());
        handleCloseEditModal();

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
                                {el.type === 'DATE' && object && object[el.fieldName]
                                    ? formatDateTime(object[el.fieldName], el.fieldName)
                                    : object?.[el.fieldName] || ''}

                            </TableCell>
                        );
                    })}
                <TableCell>
                    <IconButton aria-label="edit" color="primary" onClick={() => handleOpenEditModal()}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" color="error"
                                onClick={() => modelName && handleDeleteObject(id, modelName)}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            {
               !isLoading && devModel && (
                    <CustomModal
                        open={openEditModal}
                        onClose={handleCloseEditModal}
                        object={object}
                        devModelFields={devModel.fields}
                        handleFieldChange={handleFieldChange}
                        handleSave={handleSave}
                    />
                )
            }
        </>
    );
};
