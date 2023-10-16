import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {modelsApi} from "./api/ModelsApi";

const rootReducer = combineReducers({
    [modelsApi.reducerPath]: modelsApi.reducer,
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