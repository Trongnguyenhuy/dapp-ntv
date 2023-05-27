/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./App.css";
import { Router } from "./Components/Router/Router";
import { deleteMessage, setWarming } from "./Redux/Reducers/MessageReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  addWalletInfo,
  checkChainId,
} from "./Services/WalletServices/WalletServices";
import ModalWarming from "./Components/Modals/ModalWarming";

function App() {
  const { message, warming } = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        try {
          await checkChainId(dispatch);
        } catch (error) {
          console.error(error);
        }
        window.ethereum.on("chainChanged", async () => {
          await checkChainId(dispatch);
        });
        window.ethereum.on("accountsChanged", async () => {
          await addWalletInfo(dispatch);
        });
      } else {
        const warmingAction = setWarming({
          type: "instruct",
          header: "Chưa Cài Đặt!",
          message: "Làm ơn cài đặt ví MetaMask!",
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

  return (
    <div
      style={{ color: "white" }}
      className="h-max font-poppins leading-loose relative bg-[#091227]"
    >
      <ModalWarming />
      {Object.keys(warming).length === 0 && <Router />}
    </div>
  );
}

export default App;
