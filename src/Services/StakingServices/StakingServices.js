import web3 from "../Web3/Web3";
import stakingABI from "../ABI/StakingToken.json";

const contractAdress = "0xb7b3EdBD4A01cEE4C86C4704AD06a8C3C414Bbe1";

export default new web3.eth.Contract(stakingABI.abi, contractAdress);

// const contractBSCAdress = "0x6141AA7ddf4953Ba21F677554A0Ccf923e322bF4";

// export default new web3.eth.Contract(stakingABI.abi, contractBSCAdress);