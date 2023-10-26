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
import {CustomModal} from './CustomModal/CustomModal';
import Switcher from "./Switcher";

export const Header: FC = () => {

    const dispatch = useDispatch();
    const {modelName} = useParams();
    const formData = useSelector(selectFormData);

    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)

    const {data: devModel, isLoading} = useGetDevModelQuery(modelName);
    const [addObject] = useAddModelObjectMutation();

    const [openAddModal, setOpenAddModal] = React.useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);


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

    useEffect(() => {
        setTimeout(() => {
            setSuccess(false);
            setError(false)
        }, 5000);
    }, [success, error]);


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
                        <Switcher/>
                        <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                            {modelName && devModel ? devModel.modelLabel ? `${devModel.modelLabel}` : `${devModel.modelName}` : 'Панель администратора'}
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