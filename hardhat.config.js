require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18"
  },
  paths: {
    artifacts: "./client/src/artifacts"
  },
  networks:{
    bsctest:{
      url: 'https://data-seed-prebsc-2-s2.binance.org:8545',
      accounts: [process.env.PRIV_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY
  }
};
