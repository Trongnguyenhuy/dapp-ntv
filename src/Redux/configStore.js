import { configureStore } from "@reduxjs/toolkit";
import FarmingReducer from "./Reducers/FarmingReducer";
import MessageReducer from "./Reducers/MessageReducer";

export const store = configureStore({
  reducer: {
    farmingReducer: FarmingReducer,
    messageReducer: MessageReducer,
  },
});
