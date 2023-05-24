import web3 from "../Web3/Web3";
import stakeTokenABI from "../ABI/SepoliaABI/DynamicAPRABI/RewardToken.json";

<<<<<<< Updated upstream
const rewardTokenAddress = "0x9EC9DD61eF0f0DB45cd7fdC2716D64E8F22Ab6c7";
=======
console.log(stakeTokenABI);

const rewardTokenAddress = "0x74c8b048f359BbF935fD394Dd573827BC190ACf3";
>>>>>>> Stashed changes

export default new web3.eth.Contract(stakeTokenABI.abi, rewardTokenAddress);

// const rewardTokenBSCAddress = "0xc369f981F939ED8e3C72fEd3d1fa64E4e4759477";

// export default new web3.eth.Contract(stakeTokenABI.abi, rewardTokenBSCAddress);
