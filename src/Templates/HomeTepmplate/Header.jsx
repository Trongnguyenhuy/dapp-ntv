/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import WalletInforCard from "../../Components/Card/WalletInforCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductApi,
  getPoolAPRAPI,
  getRewardTokenPerBlockApi,
  getStakerInfoApi,
  getStakingTimeInfoApi,
  getTotalMultiflierApi,
} from "../../Redux/Reducers/FarmingReducer";
import { setMessage } from "../../Redux/Reducers/MessageReducer";
import ModalInfo from "../../Components/Modals/ModalInfo";
import { useEffect } from "react";
import { checkChainId } from "../../Services/WalletServices/WalletServices";

export const reloadData = (dispatch) => {
  const allPools = getAllProductApi();
  const globalAPR = getPoolAPRAPI();
  const stakerInfo = getStakerInfoApi();
  const stakingTimeInfo = getStakingTimeInfoApi();
  const rewardTokenPerBlock = getRewardTokenPerBlockApi();
  const totalMultiflier = getTotalMultiflierApi();
  dispatch(totalMultiflier);
  dispatch(stakingTimeInfo);
  dispatch(rewardTokenPerBlock);
  dispatch(allPools);
  dispatch(stakerInfo);
  dispatch(globalAPR);
};

export const Header = () => {
  const { account, owner } = useSelector((state) => state.farmingReducer);
  const { message } = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const checkChain = await checkChainId(dispatch, false);
      if (checkChain) {
        reloadData(dispatch);
      }
    })();
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
        message: "Hãy cài đặt ví Metamask trước khi sử dụng dịch vụ",
      });
      dispatch(setMessageAction);
    }
  };

  return (
    <div className="border-b-2 border-gray-600 py-2 fixed w-full bg-[#091227] z-20">
      <div className="flex flex-row justify-between font-sans">
        <ul className="flex flex-row justify-between ml-8 gap-8 font-medium text-lg">
          <li>
            <img src={logo} alt="logo" width={65} height={65} />
          </li>
          {/* <div className="grid grid-cols-3 justify-items-start content-center gap-6 ps-8"> */}
          <li className="my-auto cursor-pointer hover:text-[#1CE6EC] uppercase">
            <Link to="/">Trang chủ</Link>
          </li>
          <li className="my-auto cursor-pointer hover:text-[#1CE6EC] uppercase">
            <Link to="/farm">Farms</Link>
          </li>
          <li className="my-auto cursor-pointer hover:text-[#1CE6EC] uppercase">
            <Link to="/pool">Pools</Link>
          </li>

          {account.walletAddress == owner && owner != "" && (
            <li className="my-auto cursor-pointer hover:text-[#1CE6EC] uppercase">
              <Link to="/admin">Admin</Link>
            </li>
          )}

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
                className="px-9 text-center w-full flex flex-row justify-between gap-4 items-center p-2 text-white walletCard rounded-full font-sans font-medium cursor-pointer"
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
