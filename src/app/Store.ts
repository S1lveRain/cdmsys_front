import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {modelsApi} from "./api/ModelsApi";
import formDataReducer from './slices/formDataSlice';
import themeReducer from './slices/themeSlice';
import dataViewSlice from "./slices/dataViewSlice";

const rootReducer = combineReducers({
    [modelsApi.reducerPath]: modelsApi.reducer,
    formData: formDataReducer,
    theme: themeReducer,
    dataView: dataViewSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddware) =>
        getDefaultMiddware({}).concat([
            modelsApi.middleware
        ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
