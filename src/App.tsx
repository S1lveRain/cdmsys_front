import React from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useSelector} from 'react-redux';
import {RootState} from "./app/Store";

function App() {

    const isDarkMode = useSelector((state: RootState) => state.theme.darkMode);

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <RouterProvider router={router}/>
        </ThemeProvider>

    )
}

export default App;
