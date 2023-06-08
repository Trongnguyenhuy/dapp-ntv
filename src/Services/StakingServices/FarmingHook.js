import useStaking from "./StakingHook";
import { useContractRead } from "@thirdweb-dev/react";
import BigNumber from "bignumber.js";

export const convertBigNumber = (hexValue) => {
  const bigNumberValue = new BigNumber(hexValue?._hex);
  const decimalValue = bigNumberValue.toString(10);
  return decimalValue;
};

export const useReadFarmingContract = (nameOfFuntion, arrParams) => {
  const contract = useStaking();
  return useContractRead(contract, nameOfFuntion, arrParams);
};
