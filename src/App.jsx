/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./App.css";
import { Router } from "./Components/Router/Router";
import { deleteMessage, setMessage } from "./Redux/Reducers/FarmingReducer";
import { useDispatch, useSelector } from "react-redux";
import { addWalletInfo } from "./Services/WalletServices/WalletServices";

function App() {
  const { message } = useSelector((state) => state.farmingReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        try {
          await addWalletInfo(dispatch);
        } catch (error) {
          console.error(error);
        }

        window.ethereum.on("chainChanged", async () => {
          await addWalletInfo(dispatch);
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", async () => {
          await addWalletInfo(dispatch);
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

  return (
    <div
      style={{ color: "white" }}
      className="h-max font-poppins leading-loose relative bg-[#091227]"
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
