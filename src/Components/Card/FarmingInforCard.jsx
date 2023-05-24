/* eslint-disable react/prop-types */
<<<<<<< Updated upstream
import { AiFillCloseCircle } from "react-icons/ai";
import { BsPatchQuestion } from "react-icons/bs";
=======
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getStakerInfo,
  harvestReward,
  unStakingToken,
  getGlobalARP,
  getPoolInfor,
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
      const APR = await getGlobalARP(poolId);
      console.log("staker: ", staker);
      setGlobalAPR(APR);
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
>>>>>>> Stashed changes

const FarmingInforCard = (props) => {
  const { setOpenInforCard } = props;
  return (
    <div
      style={{ background: "rgb(9,3,23)" }}
      className="p-8 w-[70%] rounded-2xl shadow-2xl mt-2 lg:mt-4 relative"
    >
      <div className="flex flex-row justify-around items-center gap-4">
<<<<<<< Updated upstream
        <div className="flex flex-row justify-start relative px-2">
          <img
            className="w-14 h-14"
            src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
            alt="BUSDT"
          />
          <img
            className="w-8 h-8 absolute left-12 bottom-9 bg-white rounded-full p-1"
            src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
            alt="MIA"
          />
        </div>
        <h2 className="text-3xl font-bold">Nạp VNDC</h2>
        <button className="p-1 border-2 border-[rgb(124,77,255)] text-[rgb(124,77,255)] hover:text-white hover:bg-[rgb(124,77,255)] rounded-lg shadow-lg">
          Auto Renew
=======
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
            <h2 className="text-2xl font-bold">Nạp TVN-LP nhận TVN</h2>
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
                  <span className="text-xl">TVN-LP</span>
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
                  <span className="text-xl">TVN</span>
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
              <span>{`${globalAPR ? globalAPR.toFixed(2) : 0} %`}</span>
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
>>>>>>> Stashed changes
        </button>
      </div>
      <div className="grid grid-col-4 content-center divide-y divide-gray-600 border-2 border-gray-600 rounded-lg p-6 mt-4 text-base">
        <p className="flex flex-row justify-between py-4">
          <span>APY</span>
          <span>283.11%</span>
        </p>
        <p className="flex flex-row justify-between py-4">
          <span>Phần Thưởng Đã Rút</span>
          <span>0 VNDC</span>
        </p>
        <p className="flex flex-row justify-between py-4">
          <span>Phần Thưởng Khả Dụng</span>
          <span>0 VNDC</span>
        </p>
      </div>
      <div className="grid grid-col-4 content-center divide-y divide-gray-600 border-2 border-gray-600 rounded-lg p-6 mt-4 text-base">
        <div className="flex flex-row justify-between py-4">
          <p className="flex flex-row justify-start gap-2">
            <span>Chu Kỳ</span>
            <span>
              <BsPatchQuestion className="cursor-pointer text-xl" />
            </span>
          </p>
          <p>30 Ngày</p>
        </div>
        <p className="flex flex-row justify-between py-4">
          <span>Số Lượng Nạp</span>
          <span>10,000,000,000 VNDC</span>
        </p>
        <p className="flex flex-row justify-between py-4">
          <span>Chu Kỳ Trả Thưởng</span>
          <span>Hằng Ngày</span>
        </p>
      </div>
      <p className="p-2 text-gray-500">
        <b>Lưu Ý: </b>Mỗi khi kết thúc chu kỳ, bạn có thể rút tài sản về trong 5
        ngày. Nếu không rút, tài sản của bạn sẽ được tự động nạp vào chu kỳ mới.
      </p>
      <div className="flex flex-row justify-center py-2 text-base">
        <button
          // onClick={handleModal}
          className="w-full p-4 bg-[rgb(127,82,255)] rounded-lg border-gray-600 border-2"
        >
          Nạp Ngay
        </button>
      </div>
      <AiFillCloseCircle
        className="text-4xl font-bold absolute -top-4 -right-4 cursor-pointer text-white"
        onClick={() => {
          setOpenInforCard("");
        }}
      />
    </div>
  );
};

export default FarmingInforCard;
