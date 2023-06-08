/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  getStakerInfo,
  totalReward,
  updatePoolRewards,
} from "../../Services/StakingServices/FarmingServices";
import { useConnectionStatus } from "@thirdweb-dev/react";

const RewardLiveUpdate = (props) => {
  const [reward, setReward] = useState(0);
  const status = useConnectionStatus();
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
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {isTotal ? (
        <span className="text-4xl text-gray-400">
          {status == "disconnected" ? "0.00000" : reward.toFixed(8)}
        </span>
      ) : status == "disconnected" ? (
        0
      ) : (
        reward.toFixed(8)
      )}
    </>
  );
};

export default RewardLiveUpdate;
