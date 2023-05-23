/* eslint-disable react/prop-types */
import ModalContract from "../Modals/ModalContract";

const AdminFarmingCard = (props) => {

    const { id,duration } = props;
  
 
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
            <span>Tổng Số Thanh Khoản Đã Đặt Cọc</span>
            <span className="font-bold">10.000.000.000</span>
          </p>

          <p className="flex flex-row justify-between py-4">
            <span>Chu Kỳ</span>
            <span className="font-bold">{`${duration} Ngày`}</span>
          </p>
        </div>
      </div>
      <ModalContract
        poolId={id - 1}
        duration={duration}
      />
    </div>
  );
};

export default AdminFarmingCard;
