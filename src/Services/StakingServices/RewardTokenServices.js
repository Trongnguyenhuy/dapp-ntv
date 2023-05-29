import web3 from "../Web3/Web3";
import stakeTokenABI from "../ABI/SepoliaABI/DynamicAPRABI/RewardToken.json";

const rewardTokenAddress = "0x74c8b048f359BbF935fD394Dd573827BC190ACf3";

let rewardTokenServices;
if (web3) {
  rewardTokenServices = new web3.eth.Contract(
    stakeTokenABI.abi,
    rewardTokenAddress
  );
} else {
    rewardTokenServices = false;
}

export default rewardTokenServices;

// const rewardTokenBSCAddress = "0xc369f981F939ED8e3C72fEd3d1fa64E4e4759477";

// export default new web3.eth.Contract(stakeTokenABI.abi, rewardTokenBSCAddress);
