import { configureStore } from "@reduxjs/toolkit";
import  appSlice  from "../features/AppSlice";
export const store = configureStore({
    reducer: { app: appSlice },
});