import React, {FC, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, AppBar, IconButton, Switch, TextField, Toolbar} from "@mui/material";
import {useAddModelObjectMutation, useGetDevModelQuery} from "../app/api/ModelsApi";
import {useDispatch, useSelector} from 'react-redux';
import {clearFormData, selectFormData, setFormData} from "../app/slices/formDataSlice";
import InputMask from 'react-input-mask';
import {RootState} from '../app/Store';
import {toggleTheme} from "../app/slices/themeSlice";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


interface Field {
    fieldName: string;
    label: string;
    type: string;
}

const Header: FC = () => {

    const {modelName} = useParams();
    const isDarkMode = useSelector((state: RootState) => state.theme.darkMode);
    const formData = useSelector(selectFormData);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const {data: devModel, isLoading} = useGetDevModelQuery(modelName);
    const [addObject] = useAddModelObjectMutation()

    useEffect(() => {
        setTimeout(() => {
            setSuccess(false);
            setError(false)
        }, 5000);
    }, [success, error]);

    const handleFieldChange = (fieldName: string, value: string) => {
        dispatch(setFormData({[fieldName]: value}));
    };

    const handleAddButtonClick = async () => {
        await addObject({modelName: modelName, body: formData})
            .unwrap()
            .then(fulfilled => {
                setSuccess(true)
            })
            .catch(rejected => setError(true))
        dispatch(clearFormData());
        handleClose();
    };

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
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" color={'default'}>
                    <Toolbar>
                        <Link to={'/'}>
                            <IconButton
                                size="medium"
                                edge="start"
                                color="primary"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >

                                <AiOutlineHome/>
                            </IconButton>

                        </Link>
                        <IconButton onClick={handleThemeToggle}
                                    name="themeSwitch"
                                    color="primary"
                                    size={'medium'}
                                    edge={'start'}
                                    aria-label={'switchTheme'}
                                    sx={{mr: 2}}
                        >
                            {isDarkMode ? (<DarkModeIcon/>) : (<LightModeIcon />)}
                        </IconButton>
                        <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                            {modelName ? `${modelName}` : 'Admin panel'}
                        </Typography>
                        <div>
                            {
                                modelName !== undefined && (
                                    <Button
                                        size="small"
                                        aria-label="addButton"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => handleOpen()}
                                        color="primary"
                                        variant={'contained'}
                                    >
                                        <AddIcon/>
                                    </Button>
                                )
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            {
                success && (
                    <Alert onClose={() => {
                        setSuccess(false)
                    }}>Успешно добавлено!</Alert>
                )
            }
            {
                error && (
                    <Alert severity={'error'} onClose={() => {
                        setError(false)
                    }}>Произошла ошибка! Для более подробной информации проверьте консоль</Alert>
                )
            }
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
                                        {
                                            el.type === 'DATE' ? (
                                                <InputMask mask="9999-99-99" maskChar="_"
                                                           value={formData[el.fieldName] || ''}
                                                           onChange={(e) => handleFieldChange(el.fieldName, e.target.value)}>
                                                    <TextField
                                                        id="filled-basic"
                                                        label={el.label ? el.label : el.fieldName}
                                                        variant="outlined"
                                                        size={'medium'}
                                                        fullWidth
                                                    />
                                                </InputMask>
                                            ) : (
                                                <TextField id="filled-basic" label={el.label ? el.label : el.fieldName}
                                                           variant="outlined"
                                                           size={'medium'} fullWidth
                                                           value={formData[el.fieldName] || ''}
                                                           onChange={(e) => handleFieldChange(el.fieldName, e.target.value)}/>
                                            )
                                        }
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