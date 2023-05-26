/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import {
  getAllGlobalAPRPool,
  getAllPools,
  getAllStakingTimeInfo,
  getStakerInfo,
} from "../../Services/StakingServices/FarmingServices";

const initialState = {
  account: {
    walletAddress: "",
    balance: 0,
    network: "",
  },
  message: [],
  pools: [],
  stakerInfo: {},
  allStakingTime: [],
  poolAPR: [],
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
    getAllPoolsAction: (state, action) => {
      state.pools = action.payload;
    },
    getStakerInforAction: (state, action) => {
      state.stakerInfo = action.payload;
    },
    getStakingTimeInforAction: (state, action) => {
      state.allStakingTime = action.payload;
    },
    getPoolAPRAction: (state, action) => {
      state.poolAPR = action.payload;
    },
  },
});

export const {
  getWalletInfor,
  setMessage,
  deleteMessage,
  getAllPoolsAction,
  getStakerInforAction,
  getStakingTimeInforAction,
  getPoolAPRAction,
} = FarmingReducer.actions;

export default FarmingReducer.reducer;

// =============== Action Thunk ===============
// Lấy thông tin của tất cả các pool có trên contract và đẩy lên store.
export const getAllProductApi = () => {
  return async (dispatch, getState) => {
    try {
      const pools = await getAllPools();

      const action = getAllPoolsAction(pools);
      dispatch(action);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Lấy thông tin Staker theo poolId
export const getStakerInfoApi = (poolId) => {
  return async (dispatch, getState) => {
    try {
      const staker = await getStakerInfo(poolId);
      const action = getStakerInforAction(staker);
      dispatch(action);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Lấy thông tin những lần stake theo của staker trong Pool
export const getStakingTimeInfoApi = (poolId, start, end) => {
  return async (dispatch, getState) => {
    try {
      const stakingTimeInfo = await getAllStakingTimeInfo(poolId, start, end);
      const action = getStakingTimeInforAction(stakingTimeInfo);
      dispatch(action);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Lấy thông tin globalAPR của Pool
// Lấy thông tin Staker theo poolId
export const getPoolAPRAPI = () => {
  return async (dispatch, getState) => {
    try {
      const globalAPR = await getAllGlobalAPRPool();
      const action = getPoolAPRAction(globalAPR);
      dispatch(action);
    } catch (err) {
      console.log(err.message);
    }
  };
};
