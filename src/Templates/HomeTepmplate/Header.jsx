/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import ModalWarming from "../../Components/Modals/ModalWarming";
import WalletInforCard from "../../Components/Card/WalletInforCard";
import { useDispatch, useSelector } from "react-redux";
import {
  disconnectAction,
  getAddressInforAction,
  getAllPoolsAction,
  getAllProductApi,
  getBalanceOfTokenInforAction,
  getOwnerAction,
  getPoolAPRAPI,
  getRewardTokenPerBlockAction,
  getRewardTokenPerBlockApi,
  getStakerInfoApi,
  getStakingTimeInfoApi,
  getTotalMultiflierAction,
  getTotalMultiflierApi,
  getWalletInforAction,
  setIsActiveChainAction,
} from "../../Redux/Reducers/FarmingReducer";
import { setMessage, setWarming } from "../../Redux/Reducers/MessageReducer";
import ModalInfo from "../../Components/Modals/ModalInfo";
import { useEffect, useState } from "react";
import {
  addWalletInfo,
  checkChainId,
} from "../../Services/WalletServices/WalletServices";
import {
  convertBigNumber,
  useReadFarmingContract,
  useRewardPerBlock,
  useTotalMultiflier,
} from "../../Services/StakingServices/FarmingHook";
import { useWalletInfor } from "../../Services/Hooks/WalletHook";
import {
  ConnectWallet,
  useAddress,
  useChain,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { useStakeTokenbalence } from "../../Services/Hooks/TokenHook";

export const reloadData = (dispatch) => {
  const globalAPR = getPoolAPRAPI();
  const stakerInfo = getStakerInfoApi();
  const stakingTimeInfo = getStakingTimeInfoApi();
  dispatch(stakingTimeInfo);
  dispatch(stakerInfo);
  dispatch(globalAPR);
};

export const Header = () => {
  const { account, owner } = useSelector((state) => state.farmingReducer);
  const { message } = useSelector((state) => state.messageReducer);
  const [openModalWarming, setOpenModalWarming] = useState(false);
  const dispatch = useDispatch();
  const status = useConnectionStatus();
  const { data, isLoading, error } = useReadFarmingContract("getAllPool", []);
  const walletInfo = useWalletInfor();
  const address = useAddress();
  const chain = useChain();
  const { resultTotal, loadingTotal, errTotal } = useTotalMultiflier();
  const { resultReward, loadingReward, errReward } = useRewardPerBlock();
  const { resultBalance, loadingBalance, errBalance } =
    useStakeTokenbalence(address);

  useEffect(() => {
    if (!isLoading && !error) {
      let modifierData = data.map((item) => {
        return {
          endStakeTime: convertBigNumber(item.endStakeTime),
          farmMultiplier: convertBigNumber(item.farmMultiplier),
          stakeToken: item.stakeToken,
          tokensStaked: convertBigNumber(item.tokensStaked),
        };
      });
      const action = getAllPoolsAction(modifierData);
      dispatch(action);
    }
  }, [data]);

  useEffect(() => {
    if (!loadingTotal && !errTotal) {
      // console.log("totalMultiflier", resultTotal);
      const totalMultiflierAction = getTotalMultiflierAction(resultTotal);
      dispatch(totalMultiflierAction);
    }
  }, [resultTotal]);

  useEffect(() => {
    if (!loadingReward && !errReward) {
      // console.log("rewardPerBlock", resultReward);
      const rewardTokenPerBlock = getRewardTokenPerBlockAction(resultReward);
      dispatch(rewardTokenPerBlock);
    }
  }, [resultReward]);

  useEffect(() => {
    if (!loadingBalance && !errBalance) {
      const balanceOfTokenAction = getBalanceOfTokenInforAction(resultBalance);
      const addressInfoAction = getAddressInforAction(address);
      dispatch(addressInfoAction);
      dispatch(balanceOfTokenAction);
    }
  }, [resultBalance]);

  useEffect(() => {
    console.log("Status:", status);
    if (status == "disconnected") {
      const action = disconnectAction();
      dispatch(action);
    } else if (status == "connected") {
      reloadData(dispatch);
    }
  }, [status]);

  useEffect(() => {
    // console.log("address:", address);
    if (address != undefined) {
      const addressInfoAction = getAddressInforAction(address);
      const balanceOfTokenAction = getBalanceOfTokenInforAction(resultBalance);
      dispatch(balanceOfTokenAction);
      dispatch(addressInfoAction);
      reloadData(dispatch);
    } else {
      const action = disconnectAction();
      dispatch(action);
    }
  }, [address]);

  useEffect(() => {
    if (chain != undefined) {
      if (chain.name == "Sepolia") {
        const activeChain = setIsActiveChainAction(true);
        const addressInfoAction = getAddressInforAction(address);
        const balanceOfTokenAction =
          getBalanceOfTokenInforAction(resultBalance);
        dispatch(activeChain);
        dispatch(balanceOfTokenAction);
        dispatch(addressInfoAction);
        reloadData(dispatch);
      } else {
        const activeChain = setIsActiveChainAction(false);
        const action = disconnectAction();
        dispatch(activeChain);
        dispatch(action);
      }
    }
  }, [chain]);

  return (
    <div className="border-b-2 border-gray-600 py-2 fixed top-0 w-full bg-[#091227] z-20">
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

          {account.walletAddress == owner && owner != "" && (
            <li className="my-auto cursor-pointer hover:text-[#1CE6EC]">
              <Link to="/admin">Admin</Link>
            </li>
          )}

          {/* </div> */}
        </ul>
        <ul className="flex flex-row justify-start items-center gap-8 mr-8">
          <ConnectWallet btnTitle="Kết Nối Ví" modalTitle="Chọn Ví Kết Nối" />
          {/* {account.walletAddress.length > 0 ? (
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
          )} */}
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
      <div className="absolute">
        <ModalWarming
          modalOpen={openModalWarming}
          setModalOpen={setOpenModalWarming}
        />
      </div>


    </div>
  );
};
