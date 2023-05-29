import {
  getStakingTimeInfoApi,
  getWalletInfor,
} from "../../Redux/Reducers/FarmingReducer";
import {
  deleteWarming,
  setMessage,
  setWarming,
} from "../../Redux/Reducers/MessageReducer";
import { checkNetwork } from "../../Ultis/NetworkCheck/NetworkCheck";
import { getBalanceOfStakeToken } from "../StakingServices/FarmingServices";
import web3 from "../Web3/Web3";

export const addWalletInfo = async (dispatch, accountsChanged) => {
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    let balance = await web3.eth.getBalance(accounts[0]);
    balance = web3.utils.fromWei(balance, "ether");

    const chainId = await web3.eth.getChainId();

    const network = checkNetwork(chainId);

    let balanceOfStakeToken = await getBalanceOfStakeToken();
    balanceOfStakeToken = balanceOfStakeToken / 1e18;

    const walletInfor = {
      account: accounts[0],
      balance: balance.substring(0, 8),
      balanceOfStakeToken: balanceOfStakeToken.toFixed(6),
      network: network,
    };
    const getWalletInforAction = getWalletInfor(walletInfor);
    const allStakingTime = getStakingTimeInfoApi();
    const warmingAction = deleteWarming();
    dispatch(allStakingTime);
    dispatch(getWalletInforAction);
    dispatch(warmingAction);
    if (accountsChanged) {
      const connectAction = setMessage({
        type: "infor",
        message: "Kết nối với ví MetaMask thành công!",
      });
      dispatch(connectAction);
    }
  } else {
    const warmingAction = setWarming({
      type: "instruct",
      header: "Chưa kết nối!",
      message: "Xin vui lòng kết nối với tài khoản MetaMask của bạn!",
      code: "wm02",
    });
    dispatch(warmingAction);
  }
};

export const checkChainId = async (dispatch) => {
  try {
    const chainId = await web3.eth.getChainId();
    const network = checkNetwork(chainId);
    if (network == "Ethereum Sepolia") {
      await addWalletInfo(dispatch, true);
    } else {
      const warmingAction = setWarming({
        type: "warming",
        header: "Sai mạng!",
        message: "Hiện tại chỉ hỗ trợ mạng Sepolia Etherium. Vui lòng dùng mạng Sepolia Ethereum để kết nối!",
        code: "wm03",
      });
      dispatch(warmingAction);
    }
  } catch (err) {
    console.log("Connect Error: ", err.message);
    const warmingAction = setWarming({
      type: "warming",
      header: "Xuất hiện lỗi!",
      message: "Có lỗi phát sinh trong lúc kiểm tra mạng!",
      code: "wm04",
    });
    dispatch(warmingAction);
  }
};

export const checkConnectAccount = async (dispatch) => {
  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length < 0) {
      const warmingAction = setWarming({
        type: "instruct",
        header: "Chưa kết nối!",
        message: "Xin vui lòng kết nối với tài khoản MetaMask của bạn!",
        code: "wm02",
      });
      dispatch(warmingAction);
    } else {
      await checkChainId(dispatch);
    }
  } catch (err) {
    console.log("Connect Error: ", err.message);
    const warmingAction = setWarming({
      type: "warming",
      header: "Xuất hiện lỗi!",
      message: "Có lỗi phát sinh trong lúc kiểm tra mạng!",
      code: "wm04",
    });
    dispatch(warmingAction);
  }
};
