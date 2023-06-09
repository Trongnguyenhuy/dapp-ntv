export const checkNetwork = (chainId) => {
  const chainIdArr = ["0x1", "0x7b7", "0x61", "0x89", "0xaa36a7", "0x13881"];
  const networkArr = [
    "Ethereum Mainnet",
    "ONUS Mainnet",
    "BSC Testnet",
    "Polygon Mainnet",
    "Ethereum Sepolia",
    "Mumbai Polygon Testnet",
  ];

  const index = chainIdArr.findIndex((item) => item == chainId);

  if (index > -1) {
    return networkArr[index];
  } else {
    return false;
  }
};

export const checkNetworkToken = (network) => {
  const tokenArr = ["ETH", "ONUS", "TBNB", "MATIC", "ETH", "MATIC"];
  const networkArr = [
    "Ethereum Mainnet",
    "ONUS Mainnet",
    "BSC Testnet",
    "Polygon Mainnet",
    "Ethereum Sepolia",
    "Mumbai Polygon Testnet",
  ];

  const index = networkArr.findIndex((item) => item == network);

  if (index > -1) {
    return tokenArr[index];
  } else {
    return false;
  }
};

export const convertSecondsToDateTime = (numberOfSeconds) => {
  let seconds = parseInt(numberOfSeconds);
  const modifierTime = (time) => {
    if (time < 10) {
      time = "0" + time;
    }

    return time;
  };

  let date = new Date(0);
  let hour = date.getHours();

  if(hour != 7){
    seconds -= (hour - 7)*3600;
  }

  date.setSeconds(seconds);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return (
    modifierTime(hours) +
    ":" +
    modifierTime(minutes) +
    " " +
    modifierTime(day) +
    "/" +
    modifierTime(month) +
    "/" +
    year
  );
};
