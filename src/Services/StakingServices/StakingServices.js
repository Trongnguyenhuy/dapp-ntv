import web3 from "../Web3/Web3";
import stakingABI from "../ABI/SepoliaABI/DynamicAPRABI/DynamicARPFarmingPool.json";


const contractAdress = "0xB25aef1a480e4613D6FAE9559F09F542CFb83f81";

let stakingServices;
if (web3) {
    stakingServices = new web3.eth.Contract(stakingABI.abi, contractAdress)
} else {
    stakingServices = false;
}

export default stakingServices;

// const contractBSCAdress = "0x6141AA7ddf4953Ba21F677554A0Ccf923e322bF4";

// export default new web3.eth.Contract(stakingABI.abi, contractBSCAdress);