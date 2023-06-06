/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import {
  getAllGlobalAPRPool,
  getAllPools,
  getAllStakerInfo,
  getAllStakingTimeForPoolInfo,
  getAllStakingTimeInfo,
  getOwnerAddress,
  getRewardTokenPerBlock,
  getTotalMultiflier,
} from "../../Services/StakingServices/FarmingServices";
import { getBalanceOfStakeToken } from "../../Services/StakingServices/FarmingServices";

const initialState = {
  account: {
    walletAddress: "",
    balance: 0,
    balanceOfStakeToken: 0,
    network: "",
  },
  pools: [],

  stakerInfo: [],
  allStakingTime: [],
  poolAPR: [],
  rewardTokenPerBlock: 0,
  totalMultiflier: 0,
  owner: 0,
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
    updateBalanceOfTokenAction: (state, action) => {
      state.account.balanceOfStakeToken = action.payload;
    },
    getOwnerAction: (state, action) => {
      state.owner = action.payload;
    },
  },
});

export const {
  getWalletInfor,
  getAllPoolsAction,
  getStakerInforAction,
  getStakingTimeInforAction,
  getPoolAPRAction,
  getRewardTokenPerBlockAction,
  getTotalMultiflierAction,
  updateBalanceOfTokenAction,
  getOwnerAction,
} = FarmingReducer.actions;

export default FarmingReducer.reducer;

// =============== Action Thunk / Middleware ===============

// Lấy thông tin owner và đẩy lên store
export const getOwnerAPI = () => {
  return async (dispatch, getState) => {
    try {
      const owner = await getOwnerAddress();
      const action = getOwnerAction(owner);
      dispatch(action);
    } catch (err) {
      console.log(err.message);
    }
  };
};

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

// Cập nhật lại Balance Token trên store.
export const updateBalanceOfTokenApi = () => {
  return async (dispatch, getState) => {
    try {
      const balance = await getBalanceOfStakeToken();
      console.log(balance);
      const action = updateBalanceOfTokenAction((balance / 1e18).toFixed(6));
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
