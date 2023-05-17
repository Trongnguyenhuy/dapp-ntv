import web3 from "../Web3/Web3";
import stakeTokenABI from "../ABI/RewardToken.json";

const rewardTokenAddress = "0x4eE52fEe90A327dd8d4Ee58641e7f40979E61335";

export default new web3.eth.Contract(stakeTokenABI.abi, rewardTokenAddress);

// const rewardTokenBSCAddress = "0xc369f981F939ED8e3C72fEd3d1fa64E4e4759477";

// export default new web3.eth.Contract(stakeTokenABI.abi, rewardTokenBSCAddress);
