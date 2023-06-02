/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalContract from "../Modals/ModalContract";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logoCoinLP from "../../assets/logo-coin-lp.png";
import logoCoinTVN from "../../assets/logo-coin-tvn.png";
import ModalWarming from "../Modals/ModalWarming";

const FarmingCard = (props) => {
  const { poolAPR, account } = useSelector((state) => state.farmingReducer);
  const { id, isHome, duration } = props;
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [openModalWarming, setOpenModalWarming] = useState(false);
  const handleClick = () => {
    history.push(`/farm-detail/${id}`); // Chuyển đến đường dẫn với param
  };

  const handleModal = () => {
    if (account.walletAddress) {
      setOpenModalWarming(false);
      setModalOpen(true);
    } else {
      setOpenModalWarming(true);
      setModalOpen(false);
    }
  };

  return (
    <div
      style={{ background: "#fff", color: "#091227" }}
      className="w-full rounded-lg mt-2 lg:mt-4 font-poppins"
    >
      <div className="flex flex-col justify-around items-center walletCard rounded-t-lg py-8">
        <div className="flex flex-row justify-start relative py-2">
          <img className="w-20 h-20" src={logoCoinTVN} alt="TVN" />
          <img
            className="w-12 h-12 absolute left-16 bottom-12 rounded-full"
            src={logoCoinLP}
            alt="TVN-LP"
          />
        </div>
        <h2 className="text-xl font-bold font-sans text-white">Nạp TVN-LP nhận TVN</h2>
      </div>
      <div className="grid grid-col-4 content-center rounded-lg p-8 text-lg w-full">
        <div className="grid grid-col-4 content-center rounded-lg text-md w-full gap-2">
          <p className="flex flex-row justify-between">
            <span>APR</span>
            <span className="font-semibold">
              {poolAPR.length > 0 ? poolAPR[id - 1] : 0} %
            </span>
          </p>

          <p className="flex flex-row justify-between">
            <span>Chu kỳ</span>
            {/* <span className="font-bold">{duration} s</span> */}
            <span className="font-semibold">30 ngày</span>
          </p>
          <div className="flex flex-col items-center py-4">
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
          className={`flex flex-row justify-center ${
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
      <ModalWarming
        modalOpen={openModalWarming}
        setModalOpen={setOpenModalWarming}
      />
    </div>
  );
};

export default FarmingCard;
