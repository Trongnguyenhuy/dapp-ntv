/* eslint-disable react-hooks/exhaustive-deps */
import useStaking from "./StakingHook";
import { useContractRead } from "@thirdweb-dev/react";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";

export const convertBigNumber = (hexValue) => {
  const bigNumberValue = new BigNumber(hexValue?._hex);
  const decimalValue = bigNumberValue.toString(10);
  return decimalValue;
};

export const useReadFarmingContract = (nameOfFuntion, arrParams) => {
  const contract = useStaking();
  return useContractRead(contract, nameOfFuntion, arrParams);
};

export const useTotalMultiflier = () => {
  const [result, setResult] = useState(0);
  const { data, isLoading, error } = useReadFarmingContract(
    "getTotalMultiplier",
    []
  );

  useEffect(() => {
    if (!isLoading && !error) {
      const modifierData = convertBigNumber(data);
      setResult(modifierData);
    }
  }, [data]);

  return {
    resultTotal: result,
    loadingTotal: isLoading,
    errTotal: error,
  };
};

export const useRewardPerBlock = () => {
  const [result, setResult] = useState(0);
  const { data, isLoading, error } = useReadFarmingContract(
    "getRewardTokenPerBlock",
    []
  );

  useEffect(() => {
    if (!isLoading && !error) {
      const modifierData = convertBigNumber(data);
      setResult(modifierData);
    }
  }, [data]);

  return {
    resultReward: result,
    loadingReward: isLoading,
    errReward: error,
  };
};

export const usePools = () => {
  const [result, setResult] = useState([]);
  const { data, isLoading, error } = useReadFarmingContract("getAllPool", []);

  useEffect(() => {
    if (!isLoading && !error) {
      let modifierData = data.map((item) => {
        return {
          // endStakeTime: ethers.utils.formatUnits(item.endStakeTime),
          endStakeTime: convertBigNumber(item.endStakeTime),
          farmMultiplier: convertBigNumber(item.farmMultiplier),
          stakeToken: item.stakeToken,
          tokensStaked: convertBigNumber(item.tokensStaked),
        };
      });
      setResult(modifierData);
    }
  }, [data]);

  return {
    result: result,
    loading: isLoading,
    err: error,
  };
};
