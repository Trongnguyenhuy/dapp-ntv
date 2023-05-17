export const checkNetwork = (chainId) => {
  const chainIdArr = ["0x1", "0x7b7", "0x61", "0x89", "0xaa36a7","0x13881"];
  const networkArr = [
    "Ethereum Mainnet",
    "ONUS Mainnet",
    "BSC Testnet",
    "Polygon Mainnet",
    "Ethereum Sepolia",
    "Mumbai Polygon Testnet"
  ];

  const index = chainIdArr.findIndex((item) => item == chainId);

  if (index > -1) {
    return networkArr[index];
  } else {
    return false;
  }
};

export const checkNetworkToken = (network) => {
  const tokenArr = ["ETH", "ONUS", "TBNB", "MATIC", "ETH","MATIC"];
  const networkArr = [
    "Ethereum Mainnet",
    "ONUS Mainnet",
    "BSC Testnet",
    "Polygon Mainnet",
    "Ethereum Sepolia",
    "Mumbai Polygon Testnet"
  ];

  const index = networkArr.findIndex((item) => item == network);

  if (index > -1) {
    return tokenArr[index];
  } else {
    return false;
  }
};
