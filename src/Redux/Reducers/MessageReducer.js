import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: [],
  warming: {},
};

const MessageReducer = createSlice({
  name: "messageReducer",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      const message = action.payload;
      message.id = Math.floor(Math.random() * 1000);
      state.message.push(message);
    },
    deleteMessage: (state, action) => {
      const id = action.payload;
      state.message = state.message.filter((item) => item.id !== id);
    },
    setWarming: (state, action) => {
      state.warming = action.payload;
    },
    deleteWarming: (state) => {
      state.warming = {};
    },
  },
});

export const { setMessage, deleteMessage, setWarming, deleteWarming } =
  MessageReducer.actions;

export default MessageReducer.reducer;

// =============== Action Thunk / Middleware ===============
