import Web3 from "web3";
import crowdfundingABI from "./crowdfundingABI";
import { formatInTimeZone } from "date-fns-tz";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

//Constants
export const STATES = {
  ONGOING_STATE: 0,
  FAILED_STATE: 1,
  SUCCEEDED_STATE: 2,
  PAID_OUT_STATE: 3,
};

//Web3 Utilities
export const getWeb3 = async () => {
  if (window.ethereum) {
    try {
      // Create a new Web3 instance using MetaMask's provider
      const web3 = new Web3(window.ethereum);
      // Request access to the user's MetaMask accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("MetaMask is connected");
      return web3;
    } catch (error) {
      console.error("User denied account access", error);
      return undefined;
    }
  } else {
    console.error("MetaMask is not installed");
    return undefined;
  }
};

export const getContract = (
  web3: Web3<RegisteredSubscription>,
  contractAddress: string | string[]
) => {
  if (!web3) {
    console.error("Web3 is not initialized");
    return;
  } else {
    //string
    if (typeof contractAddress === "string") {
      const contract = new web3.eth.Contract(crowdfundingABI, contractAddress);
      return contract;
    } else {
      return undefined;
    }
  }
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

//Time Utilities

export function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return `${formatInTimeZone(
    date,
    "America/New_York",
    "dd-MMM-yyyy HH:mm"
  )} EST`;
}

export function getDateFromSeconds(seconds: number | bigint) {
  const secondsAsNumber =
    typeof seconds === "bigint" ? Number(seconds) : seconds;
  const milliseconds = secondsAsNumber * 1000;
  const date = new Date(milliseconds);
  return date;
}
