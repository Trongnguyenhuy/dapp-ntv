import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";
import WalletInforCard from "../../Components/Card/WalletInforCard";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../Redux/Reducers/FarmingReducer";


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
    <div className="border-b-2 border-gray-800 py-1 fixed w-full bg-[#091227] z-20">
      <div className="flex flex-row justify-between font-sans">
        <ul className="flex flex-row justify-center ml-8 gap-2 font-medium text-lg">
          <li>
            <img src={logo} alt="logo" width={65} height={65} />
          </li>
          <div className="grid grid-cols-3 justify-items-start content-center gap-6 ps-8">
            <li className="cursor-pointer hover:text-[#1CE6EC]">
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="cursor-pointer hover:text-[#1CE6EC]">
              <Link to="/farm">Farms</Link>
            </li>
            <li className="cursor-pointer hover:text-[#1CE6EC]">
              <Link to="/pool">Pools</Link>
            </li>
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
                className="p-2 px-6 text-[#091227] bg-[#1CE6EC] hover:bg-[#fff] rounded-lg font-sans font-medium cursor-pointer "
              >
                Kết nối ví
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
