import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    view: localStorage.getItem('dataViewView') || 'table',
};

const dataViewSlice = createSlice({
    name: 'dataView',
    initialState,
    reducers: {
        setView: (state, action) => {
            state.view = action.payload;
            localStorage.setItem('dataViewView', action.payload);
        },
    },
});

export const { setView } = dataViewSlice.actions;

export default dataViewSlice.reducer;