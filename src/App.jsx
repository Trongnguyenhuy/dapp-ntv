/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./App.css";
import { Router } from "./Components/Router/Router";
import { deleteMessage, setWarming } from "./Redux/Reducers/MessageReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  checkConnectAccount,
  addWalletInfo,
  checkChainId,
} from "./Services/WalletServices/WalletServices";
// import ModalWarming from "./Components/Modals/ModalWarming";
import { getWalletInforAction } from "./Redux/Reducers/FarmingReducer";
import { reloadData } from "./Templates/HomeTepmplate/Header";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { useWalletInfor } from "./Services/Hooks/WalletHook";

function App() {
  const { message } = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();
  // const walletInfo = useWalletInfor();

  // useEffect(() => {
  //   (async () => {
  //     if (window.ethereum) {
  //       try {
  //         await checkConnectAccount(dispatch);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //       window.ethereum.on("chainChanged", async () => {
  //         const checkChain = await checkChainId(dispatch, true);
  //         if (checkChain) {
  //           reloadData(dispatch);
  //         }
  //       });
  //       window.ethereum.on("accountsChanged", async () => {
  //         await addWalletInfo(dispatch, true);
  //       });

  //       window.ethereum.on("connect", () => {
  //         const walletAction = getWalletInforAction(walletInfo);
  //         dispatch(walletAction);
  //       });
  //     } else {
  //       const warmingAction = setWarming({
  //         type: "instruct",
  //         header: "Chưa Cài Đặt!",
  //         message: "Bạn chưa cài đặt ví MetaMask!",
  //         code: "wm01",
  //       });
  //       dispatch(warmingAction);
  //     }
  //   })();

  //   // const owner = getOwnerAPI();
  //   // dispatch(owner);

  //   return () => {
  //     window.ethereum?.removeListener("chainChanged", (chainId) => {
  //       console.log("chainId", chainId);
  //     });
  //     window.ethereum?.removeListener("accountsChanged", (chainId) => {
  //       console.log("accountsChanged", chainId);
  //     });
  //   };
  // }, []);

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

  return (
    <ThirdwebProvider activeChain={Sepolia}>
      <div
        style={{ color: "white" }}
        className="h-max font-poppins leading-loose relative bg-[#091227]"
      >
        <Router />
      </div>
    </ThirdwebProvider>
  );
}

export default App;
