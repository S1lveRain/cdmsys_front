import React, {FC, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {AiOutlineHome} from "react-icons/ai";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, AppBar, IconButton, Toolbar} from "@mui/material";
import {useAddModelObjectMutation, useGetDevModelQuery} from "../app/api/ModelsApi";
import {useDispatch, useSelector} from 'react-redux';
import {clearFormData, selectFormData, setFormData} from "../app/slices/formDataSlice";
import {RootState} from '../app/Store';
import {toggleTheme} from "../app/slices/themeSlice";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { CustomModal } from './CustomModal/CustomModal';

const Header: FC = () => {

    const {modelName} = useParams();
    const isDarkMode = useSelector((state: RootState) => state.theme.darkMode);
    const formData = useSelector(selectFormData);
    const dispatch = useDispatch();
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)

    const [openAddModal, setOpenAddModal] = React.useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

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
        handleCloseAddModal();
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
                                        onClick={() => handleOpenAddModal()}
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
            {
                !isLoading && devModel && (
                    <CustomModal
                        open={openAddModal}
                        onClose={handleCloseAddModal}
                        object={formData}
                        devModelFields={devModel.fields}
                        handleFieldChange={handleFieldChange}
                        handleSave={handleAddButtonClick}
                    />
                )
            }
        </>

    );
};

export default Header;