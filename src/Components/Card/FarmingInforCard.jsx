/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalContract from "../Modals/ModalContract";
import { useParams } from "react-router-dom";
import RewardLiveUpdate from "../LiveUpdate/RewardLiveUpdate";
import logoCoinLP from "../../assets/logo-coin-lp.png";
import logoCoinTVN from "../../assets/logo-coin-tvn.png";
import {
  getGlobalARP,
  harvestAllReward,
} from "../../Services/StakingServices/FarmingServices";
import { getStakingTimeInfoApi } from "../../Redux/Reducers/FarmingReducer";
import { setMessage } from "../../Redux/Reducers/MessageReducer";
import Loading from "../Button/loadingButton";

const FarmingInforCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [harvestAllLoading, setHarvesAllLoading] = useState("");
  const [globalAPR, setGlobalAPR] = useState(0);
  const {
    account,
    pools,
    allStakingTime,
    totalMultiflier,
    rewardTokenPerBlock,
  } = useSelector((state) => state.farmingReducer);
  const { id } = useParams();
  const dispatch = useDispatch();

  const calculateGlobalAPR = () => {
    return getGlobalARP(
      totalMultiflier,
      pools[id - 1].tokensStaked,
      pools[id - 1].farmMultiplier,
      rewardTokenPerBlock
    );
  };

  useEffect(() => {
    if (totalMultiflier > 0) {
      const globalAPR = calculateGlobalAPR();
      setGlobalAPR(globalAPR.toFixed(2));
    }
  }, [totalMultiflier]);

  useEffect(() => {
    if (totalMultiflier > 0) {
      const globalAPR = calculateGlobalAPR();
      setGlobalAPR(globalAPR.toFixed(2));
    }
  }, [pools[id - 1].tokensStaked]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const poolId = id - 1;
  const amountOfStake =
    allStakingTime.length > 0
      ? allStakingTime[poolId].staker.totalTokenStake / 1e18
      : 0;

  const handleModal = () => {
    setModalOpen(true);
  };

  const handleharvestAll = async () => {
    try {
      setHarvesAllLoading("harvestAll");
      const harvest = await harvestAllReward(poolId);
      if (harvest) {
        const allStakingTime = getStakingTimeInfoApi();
        const setMessageAction = setMessage({
          type: "confirm",
          message: `Thu hoạch thành công`,
        });
        dispatch(setMessageAction);
        dispatch(allStakingTime);
        setHarvesAllLoading("");
      } else {
        const setMessageAction = setMessage({
          type: "confirm",
          message: `Thu hoạch không thành công`,
        });
        dispatch(setMessageAction);
        setHarvesAllLoading("");
      }
    } catch (err) {
      console.log(err);
      setHarvesAllLoading("");
    }
  };

  return (
    <div className="container px-40 mx-auto flex flex-col gap-6 pt-32 h-full py-8">
      <div className="flex flex-row justify-around items-center gap-4">
        <div className="w-1/3">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-row justify-start relative px-2">
              <img className="w-20 h-20" src={logoCoinTVN} alt="TVN" />
              <img
                className="w-12 h-12 absolute left-14 bottom-8 rounded-full p-1"
                src={logoCoinLP}
                alt="TVN-LP"
              />
            </div>
            <h2 className="text-2xl font-bold">Nạp TVN-LP nhận TVN</h2>
          </div>
        </div>
        <div className="w-2/3 flex flex-col gap-6">
          <div className="flex flex-row gap-6">
            <div className="w-1/2 flex flex-col items-center gap-4">
              <div className="w-full flex flex-col items-center gap-4 border-2 border-gray-600 rounded-md">
                <div className="w-full flex flex-col items-center border-b-2 border-gray-600 uppercase p-4">
                  <span>Đã đặt</span>
                </div>
                <div className="w-full flex flex-col items-center py-12 text-xl">
                  <p className="flex flex-col items-center gap-2 font-bold">
                    <span className="text-4xl text-gray-400">
                      {amountOfStake.toFixed(5)}
                    </span>
                    <span className="text-xl  py-6">TVN-LP</span>
                  </p>

                </div>
              </div>


            </div>

            <div className="w-1/2 flex flex-col items-center gap-4">
              <div className="w-full flex flex-col items-center gap-4 border-2 border-gray-600 rounded-md">
                <div className="w-full flex flex-col items-center border-b-2 border-gray-600 uppercase p-4">
                  <span>Kiếm được</span>
                </div>
                <div className="w-full flex flex-col items-center p-4 py-12 text-xl">
                  <p className="flex flex-col items-center gap-2 font-bold">
                    <RewardLiveUpdate poolId={poolId} isTotal={true} />
                    <span className="text-xl  py-6">TVN</span>
                  </p>

                </div>
              </div>


            </div>

          </div>
          <button
              onClick={handleharvestAll}
              className="p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
              style={
                allStakingTime.length > 0 ? {} : { visibility: "hidden" }
              }
            >
              <Loading
                index={"harvestAll"}
                loading={harvestAllLoading}
                text={"Thu hoạch tất cả"}
              />
            </button>
        </div>

      </div>

      <div className="flex flex-row justify-around items-center">
        <div className="w-full border-2 border-gray-600 rounded-md px-8">
          <div className="flex flex-col">
            <p className="flex flex-row justify-between py-6">
              <span>APR</span>
              <span>{" " + globalAPR} %</span>
            </p>
            <p className="flex flex-row justify-between py-6">
              <span>Tổng số thanh khoản đã được đặt cọc</span>
              <span>
                {pools.length > 0
                  ? (pools[id - 1].tokensStaked / 1e18).toFixed(5)
                  : 0}
              </span>
            </p>
            <p className="flex flex-row justify-between py-6">
              <span>Chu kỳ trả thưởng</span>
              <span>Hằng ngày</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-8 w-full rounded-md cursor-pointer py-6">
        <span className="underline">Xem hợp đồng</span>
        <button
          disabled={account.address == undefined}
          onClick={handleModal}
          className="w-full p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
        >
          Đặt cọc
        </button>
      </div>
      <ModalContract
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        account={account}
        poolId={poolId}
        isInfoCard={true}
      />
    </div>
  );
};

export default FarmingInforCard;
