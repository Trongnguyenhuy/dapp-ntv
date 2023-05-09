import logo from "../../../assets/logo.png";
import WalletInforCard from "../../../Components/Card/WalletInforCard";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../Redux/Reducers/FarmingReducer";

export const Header = () => {
  const { account } = useSelector((state) => state.farmingReducer);
  const dispatch = useDispatch();

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      const setMessageAction = setMessage({
        type: "warming",
        message: "Need to install MetaMask",
      });
      dispatch(setMessageAction);
    }
  };

  return (
    <div className="border-b-2 border-gray-600 relative">
      <div className="flex flex-row justify-between">
        <ul className="flex flex-row justify-start items-center ml-8 gap-2 font-bold text-xl">
          <li>
            <img src={logo} alt="logo" width={75} height={75} />
          </li>
          <div className="grid grid-cols-4 justify-items-center content-center gap-2">
            <li>Farming</li>
            <li>Pool</li>
            <li>NFT</li>
            <li>IDO</li>
          </div>
        </ul>
        <ul className="flex flex-row justify-start items-center gap-8 mr-8">
          {account.walletAddress.length > 0 ? (
            <li>
              <WalletInforCard />
            </li>
          ) : (
            <li>
              <button
                onClick={connectWalletHandler}
                className="p-4 hover:bg-[rgb(127,82,255)] rounded-lg border-gray-600 border-2 hover:border-black cursor-pointer"
              >
                Connect Wallet
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
