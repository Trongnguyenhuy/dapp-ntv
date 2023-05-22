import web3 from "../Web3/Web3";
import stakingABI from "../ABI/MumbaiABI/MultiStakerPool/StakingToken.json";

const contractAdress = "0x00bF9774604C0489F7D02D55d9138BBFb12Bb90f";

export default new web3.eth.Contract(stakingABI.abi, contractAdress);

// const contractBSCAdress = "0x6141AA7ddf4953Ba21F677554A0Ccf923e322bF4";

// export default new web3.eth.Contract(stakingABI.abi, contractBSCAdress);