import { useState } from "react";
import logo from "../../../assets/logo.png";

export const Header = () => {
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const result = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setConnButtonText("Wallet Connected");
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Need to install MetaMask");
    }
  };

  return (
    <div className="border-b-2 border-white">
      <div className="flex flex-row justify-between">
        <ul className="flex flex-row justify-start items-center p-2 m-4 gap-8 ">
          <li className="mr-10">
            <img src={logo} alt="logo" width={75} height={75} />
          </li>
        </ul>
        <ul className="flex flex-row justify-start items-center p-2 m-4 gap-8">
          <li>
            <button
              onClick={connectWalletHandler}
              className="p-2 hover:bg-[rgb(127,82,255)] rounded-lg border-white border-2 cursor-pointer"
            >
              {connButtonText}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
