import web3 from "../Web3/Web3";
import stakingABI from "../ABI/SepoliaABI/DynamicAPRABI/DynamicARPFarmingPool.json";

const contractAdress = "0xE66eaBeb8c1ad4263b28B79829e7819D360ABc31";

export default new web3.eth.Contract(stakingABI.abi, contractAdress);

// const contractBSCAdress = "0x6141AA7ddf4953Ba21F677554A0Ccf923e322bF4";

// export default new web3.eth.Contract(stakingABI.abi, contractBSCAdress);