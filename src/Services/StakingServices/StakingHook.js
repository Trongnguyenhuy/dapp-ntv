import { useContract } from "@thirdweb-dev/react";
import stakingABI from "../ABI/SepoliaABI/DynamicAPRABI/DynamicARPFarmingPool.json";

const useStaking = () => {
  const { data: contract } = useContract(
    "0xcffe38C106CdB1006E39EFb1B86087af2fC4d32A",
    stakingABI.abi
  );
  return contract;
};

export default useStaking;
