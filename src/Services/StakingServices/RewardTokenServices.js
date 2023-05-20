import web3 from "../Web3/Web3";
import stakeTokenABI from "../ABI/MumbaiABI/RewardToken.json";

const rewardTokenAddress = "0xBA54c44a800822eb2FE59AfDE6e6Bda929D18b99";

export default new web3.eth.Contract(stakeTokenABI.abi, rewardTokenAddress);

// const rewardTokenBSCAddress = "0xc369f981F939ED8e3C72fEd3d1fa64E4e4759477";

// export default new web3.eth.Contract(stakeTokenABI.abi, rewardTokenBSCAddress);
