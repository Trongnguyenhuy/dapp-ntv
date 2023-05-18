import { AiFillCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useEffect, useState } from "react";
import ModalContract from "../Modals/ModalContract";
import { useSelector } from "react-redux";

const PoolCard = (props) => {
  const { id, isHome } = props;
  const [drop, setDrop] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { account, amountOfHarvestingToken } = useSelector(
    (state) => state.farmingReducer
  );

  useEffect(() => {
    console.log("account: ", account);
  }, [account]);

  const handleDrop = () => {
    setDrop(!drop);
  };

  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <div
      style={{ background: "#fff", color: "#091227" }}
      className="p-8 w-full rounded-lg font-sans"
    >


      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center font-poppins">
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
          <div className="flex flex-col ms-6 gap-2">
            <h2 className="text-xl font-bold">Nạp BSC</h2>
            <h2 className="text-lg font-medium">Nhận BRC</h2>
          </div>
        </div>


        <div className="flex flex-col text-center gap-2">
          <h2 className="text-xl font-bold">APY</h2>
          <h2 className="text-lg font-medium">283.11%</h2>
        </div>
        <div className="flex flex-col text-center gap-2">
          <h2 className="text-xl font-bold">Tổng số tiền đã đặt cọc</h2>
          <h2 className="text-lg font-medium">3,008,000 BSC</h2>
        </div>
        <div className="flex flex-col text-center gap-2">
          <h2 className="text-xl font-bold">Kết thúc</h2>
          <h2 className="text-lg font-medium">15 ngày</h2>
        </div>
        <div className="flex flex-col text-center">
          <button className="py-2 px-6 text-[#fff] bg-[rgb(127,82,255)] hover:bg-[rgb(81,59,143)] rounded-md font-sans font-medium cursor-pointer">
            Xem chi tiết
          </button>
        </div>

      </div>







    </div>
  );
};

export default PoolCard;
