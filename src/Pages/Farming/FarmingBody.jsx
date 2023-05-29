import { useEffect, useState } from "react";
import FarmingCard from "../../Components/Card/FarmingCard";
import {
  getStakerInfo,
  harvestReward,
  unStakingToken,
  getGlobalARP,
  getAllPools,
  getAllStakingTimeInfo,
  getPoolInfor,
  totalReward,
} from "../../Services/StakingServices/FarmingServices";
export const FarmingBody = () => {

  const [allPool, setAllPool] = useState([]);

  // const poolId = id - 1;
  useEffect(() => {
    (async () => {

      const allPools = await getAllPools();
      setAllPool(allPools);

    })();
  }, []);
  const farmingCard = [
    { id: 1, isHome: false, duration: 30 },
    { id: 2, isHome: false, duration: 60 },
    { id: 3, isHome: false, duration: 90 },
  ];
  return (
    <div className="container mx-auto flex flex-col justify-center py-20">
      <div className="flex flex-col justify-around items-center py-8">
        <h1 className="font-poppins font-bold text-4xl uppercase ">FARMS</h1>
        <h2 className="font-sans font-medium text-3xl py-2">
          Cấp thanh khoản để nhận thưởng
        </h2>
      </div>

      <div className={`flex flex-row justify-between h-sceen px-16 gap-8`}>
        {allPool.map((item, id) => (
          <FarmingCard
            key={id}
            id={id + 1}
            // apr={globalAPR[id]}
            isHome={false}
            duration={item.endStakeTime}
          />
        ))}
      </div>
    </div>
  );
};
