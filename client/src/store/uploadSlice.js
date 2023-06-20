import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    files: {},
};

const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload;
        }
    }
});

export default uploadSlice.reducer;
export const { setFiles } = uploadSlice.actions;
