import Web3 from "web3";
import crowdfundingABI from "./crowdfundingABI";
import { formatInTimeZone } from "date-fns-tz";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

//Web3 Utilities
export const getWeb3 = () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        console.log("MetaMask is connected");
      })
      .catch((error) => {
        console.error("User denied account access", error);
      });
    return web3;
  } else {
    console.error("MetaMask is not installed");
    return undefined;
  }
};

export const getContract = (
  web3: Web3<RegisteredSubscription>,
  contractAddress: string
) => {
  if (!web3) {
    console.error("Web3 is not initialized");
    return;
  } else {
    const contract = new web3.eth.Contract(crowdfundingABI, contractAddress);
    return contract;
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
