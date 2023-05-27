/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalContract from "../Modals/ModalContract";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logoCoinLP from "../../assets/logo-coin-lp.png";
import logoCoinTVN from "../../assets/logo-coin-tvn.png";

const FarmingCard = (props) => {
  const { poolAPR, account } = useSelector((state) => state.farmingReducer);
  const { id, isHome, duration } = props;
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    history.push(`/farm-detail/${id}`); // Chuyển đến đường dẫn với param
  };

  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <div
      style={{ background: "#fff", color: "#091227" }}
      className="p-8 w-full rounded-xl mt-2 lg:mt-4 font-poppins"
    >
      <div className="flex flex-col justify-around items-center">
        <div className="flex flex-row justify-start relative px-2 py-4">
          <img className="w-20 h-20" src={logoCoinTVN} alt="TVN" />
          <img
            className="w-12 h-12 absolute left-16 bottom-12 rounded-full"
            src={logoCoinLP}
            alt="TVN-LP"
          />
        </div>
        <h2 className="text-2xl font-bold">Nạp TVN-LP nhận TVN</h2>
      </div>
      <div className="grid grid-col-4 content-center rounded-lg p-2 mt-4 text-lg w-full">
        <div className="grid grid-col-4 content-center rounded-lg p-2 mt-4 text-lg w-full divide-y divide-gray-600">
          <p className="flex flex-row justify-between py-6">
            <span>APR</span>
            <span className="font-bold">
              {poolAPR.length > 0 ? poolAPR[id - 1] : 0} %
            </span>
          </p>

          <p className="flex flex-row justify-between py-4">
            <span>Chu Kỳ</span>
            <span className="font-bold">30 ngày</span>
          </p>
          <div className="flex flex-col items-center pt-8">
            <button
              onClick={handleClick}
              className={`${
                isHome == false ? "hidden" : ""
              } w-full py-4 bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-lg font-sans font-medium cursor-pointer text-white`}
            >
              Xem chi tiết
            </button>
            <span
              onClick={handleClick}
              className={`${
                isHome == true ? "hidden" : ""
              } underline cursor-pointer`}
            >
              Xem chi tiết
            </span>
          </div>
        </div>
        <div
          className={`flex flex-row justify-center py-4 ${
            isHome == true ? "hidden" : ""
          }`}
        >
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
        isInfoCard={false}
      />
    </div>
  );
};

export default FarmingCard;
