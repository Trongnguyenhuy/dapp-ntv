import web3 from "../Web3/Web3";
import stakingABI from "../ABI/SepoliaABI/DynamicAPRABI/TestABI/DynamicARPFarmingPool.json";

const contractAdress = "0x446D5222e78C3C870B2E7d25e25C8d4e9a32f7Aa";

let stakingServices;
if (web3) {
    stakingServices = new web3.eth.Contract(stakingABI.abi, contractAdress)
} else {
    stakingServices = false;
}

export default stakingServices;

// const contractBSCAdress = "0x6141AA7ddf4953Ba21F677554A0Ccf923e322bF4";

// export default new web3.eth.Contract(stakingABI.abi, contractBSCAdress);