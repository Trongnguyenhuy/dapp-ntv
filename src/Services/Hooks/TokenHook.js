/* eslint-disable react-hooks/exhaustive-deps */
import { useContract, useContractRead } from "@thirdweb-dev/react";
import stakeTokenABI from "../ABI/SepoliaABI/DynamicAPRABI/StakeToken.json";
import rewardTokenABI from "../ABI/SepoliaABI/DynamicAPRABI/RewardToken.json";
import { useState } from "react";
import { useEffect } from "react";
import { convertBigNumber } from "../StakingServices/FarmingHook";
const stakeTokenAddress = "0x84831aD87534a7E6C76f50623348578010eb14A6";
const rewardTokenAddress = "0x1e638159574e3c132E5adE8A09503cc2BC5d5C2c";

export const useTokenContract = (tokenAddress, ABI) => {
  const { data: contract } = useContract(tokenAddress, ABI);
  return contract;
};

export const useStakeToken = () => {
  return useTokenContract(stakeTokenAddress, stakeTokenABI.abi);
};

export const useRewardToken = () => {
  return useTokenContract(rewardTokenAddress, rewardTokenABI.abi);
};

export const useStakeTokebalence = (address) => {
  const contract = useStakeToken();
  const { data, isLoading, error } = useContractRead(contract, "balanceOf", [
    `${address}`,
  ]);

  return { data, isLoading, error };
};

export const useStakeTokenbalence = (address) => {
  const [result, setResult] = useState(0);
  const contract = useStakeToken();
  const { data, isLoading, error } = useContractRead(contract, "balanceOf", [
    `${address}`,
  ]);

  useEffect(() => {
    if (!isLoading && !error) {
      const modifierData = convertBigNumber(data);
      setResult(modifierData/1e18);
    }
  }, [data]);

  return {
    resultBalance: result,
    loadingBalance: isLoading,
    errBalance: error,
  };
};
