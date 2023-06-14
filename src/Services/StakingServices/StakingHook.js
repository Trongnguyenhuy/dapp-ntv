import { useContract } from "@thirdweb-dev/react";
import stakingABI from "../ABI/SepoliaABI/DynamicAPRABI/DynamicARPFarmingPool.json";

const useStaking = () => {
  const { data: contract } = useContract(
    "0xB25aef1a480e4613D6FAE9559F09F542CFb83f81",
    stakingABI.abi
  );
  return contract;
};

export default useStaking;
