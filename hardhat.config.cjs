/* eslint-disable no-undef */
require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle");

const etherscanApiKey = "N9WD4W43HYJ4UTJF5MCG1AHUHENTKST4UR";
const privateKey = "1401b6ac59418f9c6d2fc5ef3af05873e783990ae8c7b4fdfe7277bdfaa8ee49";

module.exports = {
    etherscan: {
      // Your API key for Etherscan
      // Obtain one at https://etherscan.io/
      apiKey: etherscanApiKey
    },
    defaultNetwork: "bsctestnet", // <-- change here for other network, default use hardhat network.
    networks: {
      bsctestnet: {
        url: "https://data-seed-prebsc-2-s3.binance.org:8545/",
        chainId: 97,
        accounts: [privateKey]
      },
    },
    solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true
      }
     }
    },
    paths: {
      sources: "./contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts"
    },
    mocha: {
      timeout: 20000
    }
  };