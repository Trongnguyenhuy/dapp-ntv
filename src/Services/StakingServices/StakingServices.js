import web3 from "../Web3/Web3";
import stakingABI from "../ABI/MumbaiABI/FixFarmingPool/StakingToken.json";

const contractAdress = "0x218edF9Ab71c177253731daFF5ffB2BDC1e80e5E";

export default new web3.eth.Contract(stakingABI.abi, contractAdress);

// const contractBSCAdress = "0x6141AA7ddf4953Ba21F677554A0Ccf923e322bF4";

// export default new web3.eth.Contract(stakingABI.abi, contractBSCAdress);