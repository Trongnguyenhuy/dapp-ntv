/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
// import { HomeBody } from "./Pages/Home/HomeBody";
// import { Header } from "./Templates/HomeTepmplate/Header";
// import { Footer } from "./Templates/HomeTepmplate/Footer";
import "./App.css";
import web3 from "./Services/Web3/Web3";
import { Router } from "./Components/Router/Router";
import {
  deleteMessage,
  getAllProductApi,
  getPoolAPRAPI,
  getWalletInfor,
  setMessage,
  // setNetwork,
} from "./Redux/Reducers/FarmingReducer";
import { useDispatch, useSelector } from "react-redux";
import ModalInfo from "./Components/Modals/ModalInfo";
import { checkNetwork } from "./Ultis/NetworkCheck/NetworkCheck";
// import { getAllGlobalAPRPool } from "./Services/StakingServices/FarmingServices";
// import background from "../src/assets/background.jpg";

function App() {
  const { message } = useSelector((state) => state.farmingReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        try {
          await addWalletInfo();
        } catch (error) {
          console.error(error);
        }

        window.ethereum.on("chainChanged", async () => {
          await addWalletInfo();
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", async () => {
          await addWalletInfo();
          window.location.reload();
        });
      } else {
        const warmingAction = setMessage({
          type: "warming",
          message: "Please Connect to your MetaMask Wallet!",
        });
        dispatch(warmingAction);
      }
    })();
    return () => {
      window.ethereum?.removeListener("chainChanged", (chainId) => {
        console.log("chainId", chainId);
      });
      window.ethereum?.removeListener("accountsChanged", (accounts) => {
        console.log("accounts", accounts);
      });
    };
  }, []);

  useEffect(() => {
    if (message.length > 0) {
      const { id } = message[0];

      setTimeout(() => {
        const action = deleteMessage(id);
        dispatch(action);
      }, 3000);
    }

    return () => {
      clearTimeout();
    };
  }, [message]);

  useEffect(() => {
    const allPools = getAllProductApi();
    dispatch(allPools);
    const globalAPR = getPoolAPRAPI();
    dispatch(globalAPR);
  }, []);

  const addWalletInfo = async () => {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      const balance = await web3.eth.getBalance(accounts[0]);
      const chainId = await web3.eth.getChainId();

      const network = checkNetwork(chainId);

      const walletInfor = {
        account: accounts[0],
        balance: web3.utils.fromWei(balance, "ether"),
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

  return (
    <div
      style={{ color: "white" }}
      className="h-max font-poppins leading-loose relative backgroundRadius"
    >
      <Router />
      {/* <div className="flex flex-col items-start justify-center gap-2 absolute left-0 md:bottom-14 w-1/4">
        {message.map((item, index) => {
          return (
            <div key={index}>
              <ModalInfo message={item} />
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default App;
