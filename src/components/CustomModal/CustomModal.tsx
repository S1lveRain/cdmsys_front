import React, {FC, useState} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputMask from "react-input-mask";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {RootState} from "../../app/Store";
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {useGetModelsQuery} from "../../app/api/ModelsApi";
import axios from "axios";

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

    const {data: devModelsList, isLoading: isModelsLoading} = useGetModelsQuery('');

    const [model, setModel] = useState<({ [x: string]: string; } | null)[]>([]);

    const fetchDataForFieldName = async (fieldName: string) => {
        try {
            const response = await axios.get(`http://localhost:8000/${fieldName}`);
            if (response.status === 200) {
                const responseData = response.data;
                return {[fieldName]: responseData};
            } else {
                console.error('Request failed with status code:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Request failed:', error);
            return null;
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const newData = await Promise.all(
                devModelFields
                    .filter((el) => el.fieldName !== 'id' && el.fieldName !== 'createdAt' && el.fieldName !== 'updatedAt' && el.type === 'UUID')
                    .map(async (el) => await fetchDataForFieldName(el.fieldName))
            );
            if (newData) {
                const filteredData = newData.filter((data) => data !== null);
                setModel(filteredData);
            }
        };
        fetchData();
    }, []);

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
                        {devModelFields &&
                            devModelFields
                                .filter((el) => el.fieldName !== 'id' && el.fieldName !== 'createdAt' && el.fieldName !== 'updatedAt')
                                .map((el) => {

                                    const modelMatch = !isModelsLoading && devModelsList.find((model: any) => model.modelName.toLowerCase() === el.fieldName);
                                    const label = modelMatch ? modelMatch.modelLabel : el.label || el.fieldName;

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
                                                            label={el.label ? el.label : label ? label : el.fieldName}
                                                            variant="outlined"
                                                            size={'medium'}
                                                            fullWidth
                                                        />
                                                    </InputMask>
                                                ) : el.type === 'UUID' ? (
                                                    <FormControl style={{width: '100%'}}>
                                                        <InputLabel
                                                            id="demo-simple-select-autowidth-label">{el.label ? el.label : label ? label : el.fieldName}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-autowidth-label"
                                                            id="demo-simple-select-autowidth"
                                                            defaultValue={object?.[el.fieldName] || object?.[el.fieldName.charAt(0).toUpperCase() + el.fieldName.slice(1)]?.id || '00000000-0000-0000-0000-000000000000' || ''}
                                                            onChange={(e) => handleFieldChange(el.fieldName, e.target.value)}
                                                            fullWidth
                                                            label="links"
                                                        >
                                                            <MenuItem value={'00000000-0000-0000-0000-000000000000'}>
                                                                Нет
                                                            </MenuItem>
                                                            {
                                                                model && model.map((mdl: any) => {
                                                                    if (mdl[el.fieldName]) {
                                                                        return mdl[el.fieldName].map((item: any) => (
                                                                            <MenuItem key={item.id} value={item.id}>
                                                                                {item.name ? item.name : item.id}
                                                                            </MenuItem>
                                                                        ));
                                                                    }
                                                                    return null;
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                ) : (
                                                    <TextField
                                                        id={el.fieldName}
                                                        label={el.label ? el.label : label ? label : el.fieldName}
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
