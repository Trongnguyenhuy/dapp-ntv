/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStakerInfo } from "../../Services/StakingServices/FarmingServices";
import ModalContract from "../Modals/ModalContract";
import { useParams } from "react-router-dom";

const FarmingInforCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [staker, setStaker] = useState({});
  const { account } = useSelector((state) => state.farmingReducer);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const poolId = id - 1;
      const staker = await getStakerInfo(poolId);
      setStaker(staker);
    })();
  }, [id]);

  console.log(staker);

  const handleModal = () => {
    setModalOpen(true);
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
            <h2 className="text-2xl font-bold">Nạp BSC nhận BRC</h2>
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
                    {staker ? staker.amountOfStakeTokenOnPool / 1e18 : 0}
                  </span>
                  <span className="text-xl">TVNRC</span>
                </p>
              </div>
            </div>
            <button className="w-full p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg">
              Kết thúc
            </button>
          </div>
          <div className="w-1/2 flex flex-col items-center gap-4">
            <div className="w-full flex flex-col items-center gap-4 border-2 border-gray-800 rounded-md">
              <div className="w-full flex flex-col items-center border-b-2 border-gray-800 uppercase p-4">
                <span>Kiếm được</span>
              </div>
              <div className="w-full flex flex-col items-center p-4 py-12 text-1xl">
                <p className="flex flex-col items-center gap-2 font-bold">
                  <span className="text-4xl text-gray-400">
                    {staker ? staker.rewards / 1e18 : 0}
                  </span>
                  <span className="text-xl">TVNSC</span>
                </p>
              </div>
            </div>
            <button className="w-full p-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg">
              Thu hoạch
            </button>
          </div>
        </div>
        {/* <div className="flex flex-row justify-start relative px-2">
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
        </button> */}
      </div>
      <div className="flex flex-row justify-around items-center mt-8">
        <div className="w-full border-2 border-gray-800 rounded-md px-8">
          <div className="flex flex-col">
            <p className="flex flex-row justify-between py-6">
              <span>APY</span>
              <span>283.11%</span>
            </p>
            <p className="flex flex-row justify-between py-6">
              <span>Tổng số thanh khoản đã được đặt cọc</span>
              <span>10,000,000 BSC</span>
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
      />
    </div>
  );
};

export default FarmingInforCard;
