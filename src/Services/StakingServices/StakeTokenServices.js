import web3 from "../Web3/Web3";
import stakeTokenABI from "../ABI/SepoliaABI/DynamicAPRABI/StakeToken.json";

<<<<<<< Updated upstream
const stakeTokenAddress = "0x37e9C5254904C70923Efb21511302a41fa84dD11";
=======
const stakeTokenAddress = "0xDeFAdf7357933EE32b5983D6Ee87A31E29eED7c0";
>>>>>>> Stashed changes

export default new web3.eth.Contract(stakeTokenABI.abi, stakeTokenAddress);

// const stakeTokenBSCAddress = "0x9c11FFAa2e4b4C484659F0252e37036Fe2038aD0";

// export default new web3.eth.Contract(stakeTokenABI.abi, stakeTokenBSCAddress);
