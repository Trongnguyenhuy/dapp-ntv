import web3 from "../Web3/Web3";
import stakingABI from "../ABI/MumbaiABI/StakingToken.json";

const contractAdress = "0x6C875dC9856352842d45E25056E9EEF59275B1b3";

export default new web3.eth.Contract(stakingABI.abi, contractAdress);

// const contractBSCAdress = "0x6141AA7ddf4953Ba21F677554A0Ccf923e322bF4";

// export default new web3.eth.Contract(stakingABI.abi, contractBSCAdress);