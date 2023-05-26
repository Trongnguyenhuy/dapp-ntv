/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useSelector } from "react-redux";
import ModalContract from "../Modals/ModalContract";
import { useParams } from "react-router-dom";
import RewardLiveUpdate from "../LiveUpdate/RewardLiveUpdate";
import logoCoinLP from "../../assets/logo-coin-lp.png";
import logoCoinTVN from "../../assets/logo-coin-tvn.png";

const FarmingInforCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { account, poolAPR, pools, allStakingTime } = useSelector(
    (state) => state.farmingReducer
  );
  const { id } = useParams();
  const poolId = id - 1;
  const amountOfStake =
    allStakingTime.length > 0
      ? allStakingTime[poolId].staker.totalTokenStake / 1e18
      : 0;

  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="container px-32 mx-auto flex flex-col gap-4 pt-32 h-full py-12">
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
              <div className="w-full flex flex-col items-center p-4 py-12 text-1xl">
                <p className="flex flex-col items-center gap-2 font-bold">
                  <span className="text-4xl text-gray-400">
                    {amountOfStake.toFixed(5)}
                  </span>
                  <span className="text-xl">TVN-LP</span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center gap-4">
            <div className="w-full flex flex-col items-center gap-4 border-2 border-gray-600 rounded-md">
              <div className="w-full flex flex-col items-center border-b-2 border-gray-600 uppercase p-4">
                <span>Kiếm được</span>
              </div>
              <div className="w-full flex flex-col items-center p-4 py-12 text-1xl">
                <p className="flex flex-col items-center gap-2 font-bold">
                  <RewardLiveUpdate poolId={poolId} />
                  <span className="text-xl">TVN</span>
                </p>
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
              <span>{`${poolAPR.length > 0 ? poolAPR[id - 1] : 0} %`}</span>
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
      />
    </div>
  );
};

export default FarmingInforCard;
