import web3 from "../Web3/Web3";
import stakeTokenABI from "../ABI/MumbaiABI/StakeToken.json";

const stakeTokenAddress = "0xF5093eCA8d9D560C5588455438417342D1A73062";

export default new web3.eth.Contract(stakeTokenABI.abi, stakeTokenAddress);

// const stakeTokenBSCAddress = "0x9c11FFAa2e4b4C484659F0252e37036Fe2038aD0";

// export default new web3.eth.Contract(stakeTokenABI.abi, stakeTokenBSCAddress);
