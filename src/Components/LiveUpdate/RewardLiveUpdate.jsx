/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { totalReward,  getStakerInfo } from "../../Services/StakingServices/FarmingServices";

const RewardLiveUpdate = (props) => {
  const [reward, setReward] = useState(0);
  const { poolId } = props;

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const staker = await getStakerInfo(poolId);
        let amountOfReward = await totalReward(
          poolId,
          staker.firstStakeTime,
          staker.finalStakeTime
        );
        amountOfReward = amountOfReward / 1e18;
        setReward(amountOfReward);
      } catch (err) {
        console.log(err.message);
      }
    };

    const interval = setInterval(() => {
      fetchReward();
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <span className="text-4xl text-gray-400">{reward.toFixed(5)}</span>;
};

export default RewardLiveUpdate;
