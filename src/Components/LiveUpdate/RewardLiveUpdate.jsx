/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  getStakerInfo,
  totalReward,
  updatePoolRewards,
} from "../../Services/StakingServices/FarmingServices";

const RewardLiveUpdate = (props) => {
  const [reward, setReward] = useState(0);
  const { poolId, isTotal, time } = props;

  useEffect(() => {
    const fetchReward = async () => {
      let amountOfReward;
      try {
        if (isTotal) {
          const staker = await getStakerInfo(poolId);
          amountOfReward = await totalReward(
            poolId,
            staker.firstStakeTime,
            staker.finalStakeTime
          );
          amountOfReward = amountOfReward / 1e18;
        } else {
          amountOfReward = await updatePoolRewards(poolId, time);
          amountOfReward = parseInt(amountOfReward);
          amountOfReward = amountOfReward / 1e18;
        }
        setReward(amountOfReward);
      } catch (err) {
        console.log(err.message);
      }
    };

    const interval = setInterval(() => {
      fetchReward();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {isTotal ? (
        <span className="text-4xl text-gray-400">{reward.toFixed(5)}</span>
      ) : (
        reward.toFixed(5)
      )}
    </>
  );
};

export default RewardLiveUpdate;
