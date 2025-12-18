// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../Redux/registerSlice";
import authReducer from "../Redux/authSlice";
import caseReducer from "../Redux/caseSlice";

export const store = configureStore({
    reducer: {
        register: registerReducer,
        auth: authReducer,
        case: caseReducer,
    },
});

export default store;
