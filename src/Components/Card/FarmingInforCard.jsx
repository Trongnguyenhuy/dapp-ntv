/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getStakerInfo,
  harvestReward,
  unStakingToken,
  getGlobalARP,
  getAllStakingTimeInfo,
  totalReward,
} from "../../Services/StakingServices/FarmingServices";
import ModalContract from "../Modals/ModalContract";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import RewardLiveUpdate from "../LiveUpdate/RewardLiveUpdate";

const FarmingInforCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState("");
  const [globalAPR, setGlobalAPR] = useState(0);
  const [staker, setStaker] = useState({
    amountOfStakeTokenOnPool: 0,
    depositStartTime: 0,
    rewards: 0,
    startBlock: 0,
    currentBlock: 0,
  });
  const { account } = useSelector((state) => state.farmingReducer);
  const { id } = useParams();
  const poolId = id - 1;
  const amountOfStake = staker.totalTokenStake / 1e18;

  useEffect(() => {
    (async () => {
      const staker = await getStakerInfo(poolId);
      console.log("staker:", staker);
      const allStakingTime = await getAllStakingTimeInfo(
        poolId,
        staker.firstStakeTime,
        staker.finalStakeTime
      );

      console.log("allStakingTime:", allStakingTime);
      const reward = await totalReward(
        poolId,
        staker.firstStakeTime,
        staker.finalStakeTime
      );
      console.log("reward:", reward);
      // const APR = await getGlobalARP(poolId);
      // setGlobalAPR(APR);
      setStaker(staker);
    })();
  }, []);

  const handleModal = () => {
    setModalOpen(true);
  };

  const handleHarvest = async () => {
    setLoading("harvest");
    await harvestReward(poolId);
    const newStaker = await getStakerInfo(poolId);
    setStaker(newStaker);
    setLoading("");
  };

  const handleUnstaking = async () => {
    setLoading("unstaking");
    const amount = staker.amountOfStakeTokenOnPool / 1e18;
    const unstaking = await unStakingToken(poolId, amount);
    console.log(unstaking);
    const newStaker = await getStakerInfo(poolId);
    setStaker(newStaker);
    setLoading("");
  };

  return (
    <div className="flex flex-col gap-4 pt-24 w-3/5 h-full mx-auto py-12">
      <div className="flex flex-row justify-around items-center gap-4">
        <div className="w-1/3">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-row justify-start relative px-2">
              <img
                className="w-20 h-20"
                src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
                alt="BUSDT"
              />
              <img
                className="w-12 h-12 absolute left-12 bottom-6 bg-white rounded-full p-1"
                src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
                alt="MIA"
              />
            </div>
            <h2 className="text-2xl font-bold">Nạp TVNSC nhận TVNRC</h2>
          </div>
        </div>
        <div className="w-2/3 flex flex-row gap-6">
          <div className="w-1/2 flex flex-col items-center gap-4">
            <div className="w-full flex flex-col items-center gap-4 border-2 border-gray-800 rounded-md">
              <div className="w-full flex flex-col items-center border-b-2 border-gray-800 uppercase p-4">
                <span>Đã đặt</span>
              </div>
              <div className="w-full flex flex-col items-center p-4 py-12 text-1xl">
                <p className="flex flex-col items-center gap-2 font-bold">
                  <span className="text-4xl text-gray-400">
                    {amountOfStake.toFixed(5)}
                  </span>
                  <span className="text-xl">TVNRC</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleUnstaking}
              className="w-full p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
            >
              {loading === "unstaking" ? (
                <LoadingOutlined className="text-2xl font-bold" />
              ) : (
                "Kết Thúc"
              )}
            </button>
          </div>
          <div className="w-1/2 flex flex-col items-center gap-4">
            <div className="w-full flex flex-col items-center gap-4 border-2 border-gray-800 rounded-md">
              <div className="w-full flex flex-col items-center border-b-2 border-gray-800 uppercase p-4">
                <span>Kiếm được</span>
              </div>
              <div className="w-full flex flex-col items-center p-4 py-12 text-1xl">
                <p className="flex flex-col items-center gap-2 font-bold">
                  <RewardLiveUpdate poolId={poolId} />
                  <span className="text-xl">TVNSC</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleHarvest}
              className="w-full p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg"
            >
              {loading === "harvest" ? (
                <LoadingOutlined className="text-2xl font-bold" />
              ) : (
                "Thu Hoạch"
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center mt-8">
        <div className="w-full border-2 border-gray-800 rounded-md px-8">
          <div className="flex flex-col">
            <p className="flex flex-row justify-between py-6">
              <span>APR</span>
              <span>{`${globalAPR.toFixed(2)} %`}</span>
            </p>
            <p className="flex flex-row justify-between py-6">
              <span>Tổng số thanh khoản đã được đặt cọc</span>
              <span>10,000,000 TVNSC</span>
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
