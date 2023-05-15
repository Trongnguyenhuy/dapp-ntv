/* eslint-disable react/prop-types */
// import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useEffect, useState } from "react";
import ModalContract from "../Modals/ModalContract";
import { useSelector } from "react-redux";

const FarmingCard = (props) => {
  const { openInforCard, setOpenInforCard } = props;
  // const [drop, setDrop] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { account } = useSelector((state) => state.farmingReducer);

  useEffect(() => {
    console.log("account: ", account);
  }, [account]);

  // const handleDrop = () => {
  //   setDrop(!drop);
  // };

  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <div
      style={{ background: "rgb(9,3,23)" }}
      className="p-8 w-full rounded-2xl shadow-2xl mt-4 lg:mt-16"
    >
      <div className="flex flex-row justify-around items-center gap-4">
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
        </button>
      </div>
      <div className="grid grid-col-4 content-center divide-y divide-gray-600 border-2 border-gray-600 rounded-lg p-6 mt-4 text-xl">
        {openInforCard.length > 0 ? (
          <>
            <p className="flex flex-row justify-between py-4">
              <span>Nhận lại</span>
              <span>VNDC</span>
            </p>
          </>
        ) : (
          <>
            <p className="flex flex-row justify-between py-4">
              <span>APY</span>
              <span>283.11%</span>
            </p>
            <p className="flex flex-row justify-between py-4">
              <span>Chu Kỳ</span>
              <span>30 ngày</span>
            </p>
            <p
              onClick={() => {
                setOpenInforCard("Card 1");
              }}
              className="flex flex-row justify-center py-4"
            >
              <span className="text-blue-700 cursor-pointer">Xem Chi Tiêt</span>
            </p>
            <div className="flex flex-row justify-center py-4">
              <button
                onClick={handleModal}
                className="w-full p-4 bg-[rgb(127,82,255)] rounded-lg border-gray-600 border-2"
              >
                Nạp
              </button>
            </div>
          </>
        )}
      </div>
      <ModalContract
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        account={account}
      />
    </div>
  );
};

export default FarmingCard;
