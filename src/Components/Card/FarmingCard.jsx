import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useState } from "react";
import ModalContract from "../Modals/ModalContract";

const FarmingCard = () => {
  const [drop, setDrop] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDrop = () => {
    setDrop(!drop);
  };

  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <div
      style={{ background: "rgb(9,3,23)" }}
      className="p-8 w-1/3 rounded-2xl shadow-2xl"
    >
      <div className="flex flex-row justify-around items-center gap-4">
        <div className="flex flex-row justify-start relative px-2">
          <img
            className="w-12 h-12 absolute right-10"
            src="https://miaswap.io/assets/token/0x5df107f23d3ec5efa926b999ce285a88955ae56b.png"
            alt="MIA"
          />
          <img
            className="w-12 h-12"
            src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
            alt="BUSDT"
          />
        </div>
        <h2 className="text-3xl font-bold">MIA-BUSDT</h2>
        <p className="bg-[rgb(124,77,255)] p-2 rounded-2xl">25x</p>
      </div>
      <div className="border-2 border-white rounded-lg p-4 mt-4 fontsize-[20rem]">
        <p className="flex flex-row justify-between">
          <span>APR</span>
          <span>1740.5191%</span>
        </p>
        <p className="flex flex-row justify-between">
          <span>Earn</span>
          <span>MIA + Fees</span>
        </p>
      </div>
      <div className="border-2 border-white rounded-lg p-4 mt-4 fontsize-[20rem]">
        <div className="border-b-2 border-gray-200">
          <p>MIA Earned</p>
          <p>0.0000</p>
          <div className="flex flex-row justify-center w-full py-4">
            <button className="w-full p-4 bg-[rgb(28,23,41)] rounded-lg border-white border-2 disabled">
              Harvest
            </button>
          </div>
        </div>
        <div className="mt-4">
          <p>MIA-BUSD LP Staked</p>
          <div className="flex flex-row justify-center w-full py-4">
            <button
              onClick={handleModal}
              className="w-full p-4 bg-[rgb(127,82,255)] rounded-lg border-white border-2"
            >
              Enable Contract
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-center mt-4">
        {!drop ? (
          <AiFillCaretDown
            className="text-2xl cursor-pointer"
            onClick={handleDrop}
          />
        ) : (
          <AiOutlineCaretUp
            className="text-2xl cursor-pointer"
            onClick={handleDrop}
          />
        )}
      </div>
      {drop && (
        <div>
          <p className="flex flex-row justify-between">
            <span>Total Liquidity</span>
            <span>$516.32</span>
          </p>
          <p>Ends in</p>
        </div>
      )}
      <ModalContract modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default FarmingCard;
