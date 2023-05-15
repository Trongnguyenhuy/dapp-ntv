import web3 from "../Web3/Web3";
import stakingABI from "../ABI/StakingABI/StakingToken.json";

const contractAdress = "0x6027A96359793fbbe62E244876Aebd0C10a69fD8";

export default new web3.eth.Contract(stakingABI.abi, contractAdress);
