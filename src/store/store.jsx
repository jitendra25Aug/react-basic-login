import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import uiSlice from "./ui/uiSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        ui: uiSlice.reducer,
        products: productsSlice.reducer
    }
});