/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalContract from "../Modals/ModalContract";
import { useParams } from "react-router-dom";
import RewardLiveUpdate from "../LiveUpdate/RewardLiveUpdate";
import logoCoinLP from "../../assets/logo-coin-lp.png";
import logoCoinTVN from "../../assets/logo-coin-tvn.png";
import { harvestAllReward } from "../../Services/StakingServices/FarmingServices";
import { getStakingTimeInfoApi } from "../../Redux/Reducers/FarmingReducer";
import { setMessage } from "../../Redux/Reducers/MessageReducer";

const FarmingInforCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { account, poolAPR, allStakingTime } = useSelector(
    (state) => state.farmingReducer
  );
  const { id } = useParams();
  const dispatch = useDispatch();

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
      const harvest = await harvestAllReward(poolId);
      if (harvest) {
        const allStakingTime = getStakingTimeInfoApi();
        const setMessageAction = setMessage({
          type: "confirm",
          message: `Thu hoạch thành công`,
        });
        dispatch(setMessageAction);
        dispatch(allStakingTime);
      } else {
        const setMessageAction = setMessage({
          type: "confirm",
          message: `Thu hoạch không thành công`,
        });
        dispatch(setMessageAction);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container px-32 mx-auto flex flex-col gap-4 pt-32 h-full py-8">
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
        <div className="w-2/3 flex flex-row gap-6">
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
                <button
                  className="w-full p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
                  style={{ visibility: "hidden" }}
                >
                  Rút
                </button>
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
                <button
                  onClick={handleharvestAll}
                  className="w-full p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
                >
                  Thu Hoạch Tất Cả
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center mt-8">
        <div className="w-full border-2 border-gray-600 rounded-md px-8">
          <div className="flex flex-col">
            <p className="flex flex-row justify-between py-6">
              <span>APR</span>
              <span>{poolAPR.length > 0 ? poolAPR[poolId] : 0} %</span>
            </p>
            <p className="flex flex-row justify-between py-6">
              <span>Tổng số thanh khoản đã được đặt cọc</span>
              <span>
                {allStakingTime.length > 0
                  ? (allStakingTime[poolId].pool.tokensStaked / 1e18).toFixed(5)
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
          onClick={handleModal}
          className="w-full p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
        >
          Thêm thanh khoản
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
