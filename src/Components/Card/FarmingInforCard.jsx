/* eslint-disable react/prop-types */
import { AiFillCloseCircle } from "react-icons/ai";
import { BsPatchQuestion } from "react-icons/bs";

const FarmingInforCard = (props) => {
  const { setOpenInforCard } = props;
  return (
    <div
      style={{ background: "rgb(9,3,23)" }}
      className="p-8 w-[70%] rounded-2xl shadow-2xl mt-2 lg:mt-4 relative"
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