import web3 from "../Web3/Web3";
import stakeTokenABI from "../ABI/SepoliaABI/DynamicAPRABI/StakeToken.json";

const stakeTokenAddress = "0xDeFAdf7357933EE32b5983D6Ee87A31E29eED7c0";

let stakeTokenServices;
if (web3) {
  stakeTokenServices = new web3.eth.Contract(
    stakeTokenABI.abi,
    stakeTokenAddress
  );
} else {
  stakeTokenServices = false;
}

export default stakeTokenServices;

// const stakeTokenBSCAddress = "0x9c11FFAa2e4b4C484659F0252e37036Fe2038aD0";

// export default new web3.eth.Contract(stakeTokenABI.abi, stakeTokenBSCAddress);
