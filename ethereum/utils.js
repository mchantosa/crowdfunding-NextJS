import Web3 from "web3";
export function getWeb3() {
  //return new Web3(Web3.givenProvider || "ws://localhost:8545");
  return new Web3(window.ethereum);
}
