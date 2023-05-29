/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import WalletInforCard from "../../Components/Card/WalletInforCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductApi,
  getPoolAPRAPI,
  getStakerInfoApi,
  getStakingTimeInfoApi,
  setMessage,
} from "../../Redux/Reducers/FarmingReducer";
import ModalInfo from "../../Components/Modals/ModalInfo";
import { useEffect } from "react";

export const Header = () => {
  const { account, message } = useSelector((state) => state.farmingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const allPools = getAllProductApi();
    const globalAPR = getPoolAPRAPI();
    const stakerInfo = getStakerInfoApi();
    const stakingTimeInfo = getStakingTimeInfoApi();
    dispatch(stakingTimeInfo);
    dispatch(allPools);
    dispatch(stakerInfo);
    dispatch(globalAPR);
  }, []);

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
    <div className="border-b-2 border-gray-600 py-4 fixed w-full bg-[#091227] z-20">
      <div className="flex flex-row justify-between font-sans">
        <ul className="flex flex-row justify-between ml-8 gap-8 font-medium text-lg">
          <li>
            <img src={logo} alt="logo" width={65} height={65} />
          </li>
          {/* <div className="grid grid-cols-3 justify-items-start content-center gap-6 ps-8"> */}
          <li className="my-auto cursor-pointer hover:text-[#1CE6EC]">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="my-auto cursor-pointer hover:text-[#1CE6EC]">
            <Link to="/farm">Farms</Link>
          </li>
          <li className="my-auto cursor-pointer hover:text-[#1CE6EC]">
            <Link to="/pool">Pools</Link>
          </li>
          <li className="my-auto cursor-pointer hover:text-[#1CE6EC]">
            <Link to="/admin">Admin</Link>
          </li>
          {/* </div> */}
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
      <div className="flex flex-col w-1/3 px-16 justify-center gap-2 absolute left-1/3 top-16 md:top-14">
        {message.map((item, index) => {
          return (
            <div key={index}>
              <ModalInfo message={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
