import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./uploadSlice";

const store = configureStore({
    reducer: {
        files: uploadReducer,
    },
});

export default store;
