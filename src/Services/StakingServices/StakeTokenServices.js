import web3 from "../Web3/Web3";
import stakeTokenABI from "../ABI/StakeToken.json";

const stakeTokenAddress = "0x0D4FF697E5f8bfdC28960e4A97Bdd7F2FB113711";

export default new web3.eth.Contract(stakeTokenABI.abi, stakeTokenAddress);

// const stakeTokenBSCAddress = "0x9c11FFAa2e4b4C484659F0252e37036Fe2038aD0";

// export default new web3.eth.Contract(stakeTokenABI.abi, stakeTokenBSCAddress);
