import { configureStore } from "@reduxjs/toolkit";
import FarmingReducer from "./Reducers/FarmingReducer";


export const store = configureStore({
    reducer: {
        farmingReducer: FarmingReducer,
    }
});