/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalContract from "../Modals/ModalContract";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
const FarmingCard = (props) => {
  const { id, isHome,duration } = props;
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const { account } = useSelector((state) => state.farmingReducer);


  const handleClick = () => {
    history.push(`/farm-detail/${id}`); // Chuyển đến đường dẫn với param
  };

  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <div
      style={{ background: "#fff", color: "#091227" }}
      className="p-10 w-full rounded-xl mt-2 lg:mt-4 font-poppins"
    >
      <div className="flex flex-col justify-around items-center">
        <div className="flex flex-row justify-around items-center relative">
          <img
            className="w-14 h-14"
            src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
            alt="BUSDT"
          />
          <img
            className="w-14 h-14"
            src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
            alt="MIA"
          />
        </div>
        <h2 className="text-2xl font-bold mt-3">Nạp TVNSC nhận TVNRC</h2>

      </div>
      <div className="grid grid-col-4 content-center rounded-lg p-2 mt-4 text-lg w-full">

        <div className="grid grid-col-4 content-center rounded-lg p-2 mt-4 text-lg w-full divide-y divide-gray-600">
          <p className="flex flex-row justify-between py-6">
            <span>APY</span>
            <span className="font-bold">283.11%</span>
          </p>

          <p className="flex flex-row justify-between py-4">
            <span>Chu Kỳ</span>
            <span className="font-bold">{`${duration} Ngày`}</span>
          </p>
          <div className="flex flex-col items-center pt-8">
            <button
              onClick={handleClick}
              className={`${isHome == false ? "hidden" : ""} w-full py-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg font-sans font-medium cursor-pointer text-white`}
            >
              Xem chi tiết
            </button>
            <span 
            onClick={handleClick}
            className={`${isHome == true ? "hidden" : ""} underline cursor-pointer`}>Xem chi tiết</span>
          </div>
        </div>

        <div className={`flex flex-row justify-center py-4 ${isHome == true ? "hidden" : ""}`}>
          <button
            onClick={handleModal}
            className="w-full py-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg font-sans font-medium cursor-pointer text-white"
          >
            Nạp
          </button>
        </div>

      </div>
      <ModalContract
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        account={account}
        poolId={id - 1}
        duration={duration}
      />
    </div>
  );
};

export default FarmingCard;
