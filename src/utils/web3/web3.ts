import Web3 from "web3";
import { crowdfundingABI, crowdfundingBytecode } from "./crowdfundingABI";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

//Constants
const NETWORK_ID_TO_NAME = {
  1: "mainnet", // Ethereum Mainnet
  3: "ropsten", // Ropsten Testnet
  4: "rinkeby", // Rinkeby Testnet
  5: "goerli", // Goerli Testnet
  42: "kovan", // Kovan Testnet
  11155111: "sepolia", // Sepolia Testnet
  31337: "localhost", // Localhost
};

const SEPOLIA_UTILS_ADDRESS = "0xD30C1cFE568D63027ADE9D2CE143D1E22d396BDa";
const LOCALHOST_UTILS_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const STATES = {
  ONGOING_STATE: 0,
  FAILED_STATE: 1,
  SUCCEEDED_STATE: 2,
  PAID_OUT_STATE: 3,
};

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

export const deployContract = async (
  web3,
  account,
  args,
  setContractAddress,
  setLoading,
  setContractCreated,
  confirmationEmail
) => {
  // Set the library address based on the selected network
  let libraryAddress;
  const networkId = await web3.eth.net.getId();
  const networkIdStr = networkId.toString();
  const network = NETWORK_ID_TO_NAME[networkIdStr];
  console.log("networkId: ", networkId);
  console.log("networkIdStr: ", networkIdStr);
  console.log("network: ", network);
  if (network === "sepolia") {
    libraryAddress = SEPOLIA_UTILS_ADDRESS;
  } else if (network === "localhost") {
    libraryAddress = LOCALHOST_UTILS_ADDRESS;
  } else {
    throw new Error("Unsupported network");
  }

  // Replace the placeholder in the bytecode with the actual library address
  const linkedBytecode = crowdfundingBytecode.replace(
    /__\$[a-zA-Z0-9]{34}\$__/g,
    libraryAddress.slice(2)
  );

  const contract = new web3.eth.Contract(crowdfundingABI);
  console.log("arguments: ", args);

  try {
    // Estimate gas limit
    const estimatedGas = await contract
      .deploy({
        data: linkedBytecode,
        arguments: args,
      })
      .estimateGas({ from: account });

    // Fetch current base fee from latest block
    const latestBlock = await web3.eth.getBlock("latest");
    const baseFeePerGas = BigInt(latestBlock.baseFeePerGas);
    const priorityFeePerGas = BigInt(web3.utils.toWei("2", "gwei")); // Example priority fee; adjust as needed

    // Calculate maxFeePerGas
    const maxFeePerGas = (baseFeePerGas + priorityFeePerGas).toString();

    const newContractInstance = await contract
      .deploy({
        data: linkedBytecode,
        arguments: args,
      })
      .send({
        from: account,
        gas: estimatedGas,
        maxFeePerGas: maxFeePerGas,
        maxPriorityFeePerGas: priorityFeePerGas.toString(),
      });

    const contractAddress = newContractInstance.options.address;

    console.log("Deployed Contract Instance:", contractAddress);

    setContractAddress(contractAddress);
    setLoading(false);
    setContractCreated(true);

    // Send email with contract address disabled for now
    console.log("email disabled for now...");
    return;

    // Send the email with the contract address
    console.log("send email...");

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: confirmationEmail,
        contractAddress: contractAddress,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Error sending email:", data.error);
    } else {
      console.log("Email sent successfully:", data);
    }
  } catch (error) {
    console.error("Deployment Error:", error);
    setLoading(false);
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
