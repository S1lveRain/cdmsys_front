import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({

});
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddware) =>
        getDefaultMiddware({}).concat([
        ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;