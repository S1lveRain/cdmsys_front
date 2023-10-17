import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormDataState {
    formData: { [key: string]: any };
}

const initialState: FormDataState = {
    formData: {},
};

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<{ [key: string]: any }>) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        editFormData: (state, action: PayloadAction<{ data: any }>) => {
            const { data } = action.payload;
            state.formData = { ...state.formData, ...data };
        },
        clearFormData: (state) => {
            state.formData = {};
        },
    },
});

export const { setFormData, editFormData, clearFormData } = formDataSlice.actions;
export const selectFormData = (state: { formData: FormDataState }) => state.formData.formData;
export default formDataSlice.reducer;
