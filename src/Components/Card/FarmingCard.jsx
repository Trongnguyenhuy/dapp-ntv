/* eslint-disable react/prop-types */
// import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useEffect, useState } from "react";
import ModalContract from "../Modals/ModalContract";
import { useSelector } from "react-redux";

const FarmingCard = (props) => {
  const { openInforCard, setOpenInforCard, isHome} = props;

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
        <h2 className="text-2xl font-bold mt-3">Nạp BSC nhận BRC</h2>
        
      </div>
      <div className="grid grid-col-4 content-center divide-y divide-gray-600 rounded-lg p-2 mt-4 text-lg">
        {openInforCard.length > 0 ? (
          <>
            <p className="flex flex-row justify-between py-6">
              <span>Nhận lại</span>
              <span>VNDC</span>
            </p>
          </>
        ) : (
          <>
            <p className="flex flex-row justify-between py-6">
              <span>APY</span>
              <span className="font-bold">283.11%</span>
            </p>
            <p className="flex flex-row justify-between py-4">
              <span>Chu Kỳ</span>
              <span className="font-bold">30 ngày</span>
            </p>
            <div className="flex flex-row justify-center pt-8">
            <button
              onClick={() => {
                setOpenInforCard("Card 1");
              }}
              className="w-full py-4 text-[#fff] bg-[#170296] hover:bg-[#026796] rounded-lg font-sans font-medium cursor-pointer"
            >
              Xem chi tiết
            </button>
            </div>
            

              <div className={`flex flex-row justify-center py-4 ${isHome == true ? "hidden" : ""}`}>
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
