import Web3 from "web3";
import crowdfundingABI from "./crowdfundingABI";
require("dotenv").config();

export const getWeb3 = () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    // Request account access if needed
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        console.log("MetaMask is connected");
      })
      .catch((err) => {
        console.error("User denied account access", err);
      });
    return web3;
  } else {
    console.error("MetaMask is not installed");
    return null;
  }
};

export const getContract = (web3, address) => {
  //console.log(address);
  const contract = new web3.eth.Contract(crowdfundingABI, address);
  return contract;
};

export const convertWeiToEther = (
  wei: string | number | bigint,
  web3: Web3
): string => {
  const weiString = wei.toString();
  const ether = web3.utils.fromWei(weiString, "ether");
  return ether;
};

export const convertWeiToDollars = (
  wei: string | number | bigint,
  conversionRate: number,
  web3: Web3
): string => {
  const weiString = wei.toString();
  const ether = web3.utils.fromWei(weiString, "ether");
  const dollars = (parseFloat(ether) * conversionRate).toFixed(2);
  return dollars;
};

export const convertEtherToDollars = (
  ether: string,
  conversionRate: number
): string => {
  const dollars = (parseFloat(ether) * conversionRate).toFixed(2);
  return dollars;
};
