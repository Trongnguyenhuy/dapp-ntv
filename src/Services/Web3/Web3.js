import Web3 from "web3";

let web3;

if (window.web3 != undefined) {
  web3 = new Web3(window.ethereum);
} else {
  web3 = false;
}

export default web3;
