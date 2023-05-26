/* eslint-disable react/prop-types */
// import ModalContract from "../Modals/ModalContract";
import { getPoolInfor } from "../../Services/StakingServices/FarmingServices";
import { useEffect, useState } from "react";

const AdminFarmingCard = (props) => {
  // const poolId = 0;
  const {id,pool}=props
  const [farmMultiplier, setfarmMultiplier] = useState(0);
  const [totalTokenStaked, setToalTokenStaked] = useState(0);
  const [endStakeTime, setEndStakeTime] = useState(0);
 
  useEffect(() => {
    const x = async () => {
      const poolInfo = await getPoolInfor(id);
      console.log("pool:", poolInfo);
      console.log("AAAAAAAAAAA",pool);
      // const multi = await getPoolInfor(0);
      // console.log("multi:", multi);
      setfarmMultiplier(poolInfo.farmMultiplier);
      setToalTokenStaked(poolInfo.totalTokenStaked/1e18);
      setEndStakeTime(poolInfo.endStakeTime);
    };
    x();
  }, []);

  return (
    <div
      style={{ background: "#fff", color: "#091227" }}
      className="p-10 w-full rounded-xl mt-2 lg:mt-4 font-poppins"
    >
      <div className="flex flex-col justify-around items-center">
        <div className="flex flex-row justify-around items-center relative">
          {/* <img
            className="w-14 h-14"
            src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
            alt="BUSDT"
          />
          <img
            className="w-14 h-14"
            src="https://miaswap-img-s3.s3.ap-northeast-1.amazonaws.com/busd.png"
            alt="MIA"
          /> */}
        </div>
        <h2 className="text-2xl font-bold mt-3">Nạp TVNSC nhận TVNRC</h2>
      </div>
      <div className="grid grid-col-4 content-center rounded-lg p-2 mt-4 text-lg w-full">
        <div className="grid grid-col-4 content-center rounded-lg p-2 mt-4 text-lg w-full divide-y divide-gray-600">
          <p className="flex flex-row justify-between py-6">
            <span>Tổng Số Thanh Khoản</span>
            <span className="font-bold">{totalTokenStaked}</span>
          </p>

          <p className="flex flex-row justify-between py-4">
            <span>Thời Hạn</span>
            <span className="font-bold">{endStakeTime}</span>
          </p>

          {/* <p className="flex flex-row justify-between py-4">
            <span>Trạng Thái</span>
            <span className="font-bold">{`${opens}`}</span>
          </p> */}
  
          <p className="flex flex-row justify-between py-4">
            <span>Tỉ Trọng</span>
            <span className="font-bold">{farmMultiplier}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminFarmingCard;
