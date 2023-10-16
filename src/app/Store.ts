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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;