import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { convertEtherToDollars } from "../../../utils/web3/web3";
export default function ContributeInput(props) {
  const [contributionAmount, setContributionAmount] = useState<string>("");
  const { loadCampaignData, contractAddress, userAccount, etherPrice, web3 } =
    props;

  async function onContribute() {
    console.log("Begin contribute: " + contributionAmount);
    const amount = web3.utils.toWei(contributionAmount, "ether");

    try {
      // Step 1: Get the current nonce for the account
      const nonce = await web3.eth.getTransactionCount(userAccount, "pending");
      console.log("Using nonce: ", nonce);

      // Estimate gas for the transaction
      const gasEstimate = await web3.eth.estimateGas({
        value: amount,
        from: userAccount,
        to: contractAddress,
      });

      console.log("Gas estimate: ", gasEstimate);
      console.log(amount, userAccount, contractAddress);

      // Step 2: Send the transaction with the correct nonce
      await web3.eth
        .sendTransaction({
          value: amount,
          from: userAccount,
          to: contractAddress,
          gas: gasEstimate,
          nonce: nonce, // Use the retrieved nonce
        })
        .once("transactionHash", (hash) => {
          console.log("Transaction hash received: ", hash);
        })
        .once("receipt", (receipt) => {
          console.log("Transaction receipt received: ", receipt);
        })
        .on("confirmation", (confNumber, receipt, latestBlockHash) => {
          console.log("Transaction confirmed: ", confNumber);
        })
        .on("error", (error) => {
          console.log("Transaction error: ", error);
        });

      // Reset contribution amount and reload campaign data
      setContributionAmount("");
      await loadCampaignData(contractAddress);
    } catch (error) {
      console.error("Error during contribution:", error);
    }
  }
  const isValidContribution =
    contributionAmount !== "" && !isNaN(parseFloat(contributionAmount));

  return (
    <div className="flex flex-row justify-start items-end space-x-2">
      <div className="relative">
        <TextField
          variant="outlined"
          label="ETH"
          placeholder="Amount to contribute"
          value={contributionAmount}
          onChange={(e) => setContributionAmount(e.target.value)}
        />
        {isValidContribution && (
          <Typography
            component="span"
            className="text-green-500 absolute right-2 -bottom-2 px-1"
            sx={{ fontSize: "0.875rem", backgroundColor: "white" }}
          >
            ${convertEtherToDollars(contributionAmount, etherPrice)}
          </Typography>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onContribute}
        disabled={!isValidNumber(contributionAmount)}
      >
        Contribute
      </Button>
    </div>
  );
}

function isValidNumber(amount) {
  if (!amount) {
    return false;
  }
  if (typeof amount !== "number") {
    return (
      !isNaN(parseFloat(amount)) && isFinite(amount) && parseFloat(amount) > 0
    );
  }
  if (amount <= 0) {
    return false;
  }
  return true;
}
