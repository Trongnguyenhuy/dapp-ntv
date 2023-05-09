import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    walletAddress: "",
    balance: 0,
    network: "",
  },
  amountOfFarmingToken: 0,
  amountOfHarvestingToken: 0,
  message: [],
};

const FarmingReducer = createSlice({
  name: "farmingReducer",
  initialState,
  reducers: {
    getWalletInfor: (state, action) => {
      const { account, balance, network } = action.payload;
      state.account.walletAddress = account;
      state.account.balance = balance;
      state.account.network = network;
    },
    setMessage: (state, action) => {
      const message = action.payload;
      message.id = Math.floor(Math.random() * 1000);
      state.message.push(message);
    },
    deleteMessage: (state, action) => {
      const id = action.payload;
      state.message = state.message.filter((item) => item.id !== id);
    },
    setHarvestingToken: (state, action) => {
      const token = action.payload;
      const harvestingToken = token * 2.8311;
      state.amountOfHarvestingToken = harvestingToken;
    },
    // setNetwork: (state, action) => {
    //   const network = action.payload;
    //   state.account.network = network;
    // },
  },
});

export const {
  getWalletInfor,
  setMessage,
  deleteMessage,
  setHarvestingToken,
  // setNetwork,
} = FarmingReducer.actions;

export default FarmingReducer.reducer;
