import { getWalletInfor, setMessage } from "../../Redux/Reducers/FarmingReducer";
import { checkNetwork } from "../../Ultis/NetworkCheck/NetworkCheck";
import { getBalanceOfStakeToken } from "../StakingServices/FarmingServices";
import web3 from "../Web3/Web3";

export const addWalletInfo = async (dispatch) => {
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
    const connectAction = setMessage({
      type: "infor",
      message: "Connect to MetaMask success!",
    });
    dispatch(getWalletInforAction);
    dispatch(connectAction);
  }
};
