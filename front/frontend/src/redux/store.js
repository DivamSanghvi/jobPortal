import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice"; // Correct path
// Importing default export

const store = configureStore ({
    reducer:{
        auth: authSlice
    }
});
export default store