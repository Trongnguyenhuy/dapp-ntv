import web3 from "../Web3/Web3";
import stakingABI from "../ABI/SepoliaABI/DynamicAPRABI/TestABI/DynamicARPFarmingPool.json";

const contractAdress = "0xAaB54dbD7eA732dE8729ffA7631F8CF7bE93e59d";

let stakingServices;
if (web3) {
    stakingServices = new web3.eth.Contract(stakingABI.abi, contractAdress)
} else {
    stakingServices = false;
}

export default stakingServices;

// const contractBSCAdress = "0x6141AA7ddf4953Ba21F677554A0Ccf923e322bF4";

// export default new web3.eth.Contract(stakingABI.abi, contractBSCAdress);