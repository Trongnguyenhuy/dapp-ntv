/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import {
  getAllGlobalAPRPool,
  getAllPools,
  getAllStakerInfo,
  getAllStakingTimeForPoolInfo,
  getAllStakingTimeInfo,
  getRewardTokenPerBlock,
  getTotalMultiflier,
} from "../../Services/StakingServices/FarmingServices";

const initialState = {
  account: {
    walletAddress: "",
    balance: 0,
    balanceOfStakeToken: 0,
    network: "",
  },
  message: [],
  pools: [],
  stakerInfo: [],
  allStakingTime: [],
  poolAPR: [],
  rewardTokenPerBlock: 0,
  totalMultiflier: 0,
};

const FarmingReducer = createSlice({
  name: "farmingReducer",
  initialState,
  reducers: {
    getWalletInfor: (state, action) => {
      const { account, balance, balanceOfStakeToken, network } = action.payload;
      state.account.walletAddress = account;
      state.account.balance = balance;
      state.account.balanceOfStakeToken = balanceOfStakeToken;
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
    getRewardTokenPerBlockAction: (state, action) => {
      state.rewardTokenPerBlock = action.payload;
    },
    getTotalMultiflierAction: (state, action) => {
      state.totalMultiflier = action.payload;
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
  getRewardTokenPerBlockAction,
  getTotalMultiflierAction,
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

// Lấy số token thưởng 1 block và đẩy lên store.
export const getRewardTokenPerBlockApi = () => {
  return async (dispatch, getState) => {
    try {
      const reward = await getRewardTokenPerBlock();
      const action = getRewardTokenPerBlockAction(reward);
      dispatch(action);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Lấy số token thưởng 1 block và đẩy lên store.
export const getTotalMultiflierApi = () => {
  return async (dispatch, getState) => {
    try {
      const totalMultiflier = await getTotalMultiflier();
      const action = getTotalMultiflierAction(totalMultiflier);
      dispatch(action);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Lấy thông tin Staker theo poolId
export const getStakerInfoApi = () => {
  return async (dispatch, getState) => {
    try {
      const staker = await getAllStakerInfo();
      const action = getStakerInforAction(staker);
      dispatch(action);
    } catch (err) {
      console.log(err.message);
    }
  };
};

// Lấy thông tin những lần stake theo của staker trong Pool
export const getStakingTimeInfoApi = () => {
  return async (dispatch, getState) => {
    try {
      const stakingTimeInfo = await getAllStakingTimeForPoolInfo();
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
