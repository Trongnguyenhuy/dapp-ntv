/* eslint-disable no-unused-vars */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

// const middleware = [...getDefaultMiddleware(), logger];
import FarmingReducer from "./Reducers/FarmingReducer";
import MessageReducer from "./Reducers/MessageReducer";

export const store = configureStore({
  reducer: {
    farmingReducer: FarmingReducer,
    messageReducer: MessageReducer,
    // middleware
  },
});
