import React, {FC, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputMask from "react-input-mask";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {RootState} from "../../app/Store";

interface CustomModalI {
    open: boolean;
    onClose: () => void;
    object: { [key: string]: any };
    devModelFields: any[];
    handleFieldChange: (fieldName: string, value: string) => void;
    handleSave: () => void;
}

export const CustomModal: FC<CustomModalI> = ({
                                                  open,
                                                  onClose,
                                                  object,
                                                  devModelFields,
                                                  handleFieldChange,
                                                  handleSave,
                                              }) => {


    const isDarkMode = useSelector((state: RootState) => state.theme.darkMode);

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: isDarkMode ? '#121212' : '#fff',
        border: isDarkMode ? '2px solid rgba(255, 255, 255, 0.12)' : '2px solid rgba(0, 0, 0, 0.12)',
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
    };


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Редактировать элемент
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 15, padding: 10}}>
                        {devModelFields && devModelFields.map((el: any) => {
                            if (el.fieldName === 'id' || el.fieldName === 'createdAt' || el.fieldName === 'updatedAt') {
                                return null;
                            }
                            return (
                                <div key={el.fieldName}>
                                    {
                                        el.type === 'DATE' ? (
                                            <InputMask
                                                mask="9999-99-99"
                                                maskChar="_"
                                                defaultValue={object?.[el.fieldName] || ''}
                                                onChange={(e) => handleFieldChange(el.fieldName, e.target.value)}
                                            >
                                                <TextField
                                                    id="filled-basic"
                                                    label={el.label ? el.label : el.fieldName}
                                                    variant="outlined"
                                                    size={'medium'}
                                                    fullWidth
                                                />
                                            </InputMask>
                                        ) : (
                                            <TextField
                                                id={el.fieldName}
                                                label={el.label ? el.label : el.fieldName}
                                                variant="outlined"
                                                defaultValue={object?.[el.fieldName] || ''}
                                                onChange={(e) => handleFieldChange(el.fieldName, e.target.value)}
                                                size={'medium'}
                                                fullWidth
                                            />
                                        )
                                    }
                                </div>
                            );
                        })}
                        <Button variant={'outlined'} size={'large'} onClick={handleSave}>Сохранить</Button>
                    </div>
                </Typography>
            </Box>
        </Modal>
    );
};
