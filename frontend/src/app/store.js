// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../Redux/registerSlice";
import authReducer from "../Redux/authSlice";

export const store = configureStore({
    reducer: {
        register: registerReducer,
        auth: authReducer,
    },
});

export default store;
