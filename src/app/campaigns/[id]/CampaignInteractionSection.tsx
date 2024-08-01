import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { convertEtherToDollars } from "../../../ethereum/utils";
import { getWeb3 } from "../../../ethereum/utils";

const ONGOING_STATE = 0;
const FAILED_STATE = 1;
const SUCCEEDED_STATE = 2;
const PAID_OUT_STATE = 3;

export default function campaignInteractionSection(props) {
  const {
    contractInfo,
    contractAddress,
    userAccount,
    etherPrice,
    refreshCampaign,
    setRefreshCampaign,
    setContractInfo,
  } = props;
  if (contractInfo.state === ONGOING_STATE) {
    return (
      <ContributeInput
        contractInfo={contractInfo}
        contractAddress={contractAddress}
        userAccount={userAccount}
        etherPrice={etherPrice}
        refreshCampaign={refreshCampaign}
        setRefreshCampaign={setRefreshCampaign}
        setContractInfo={setContractInfo}
      />
    );
  } else if (contractInfo.state === SUCCEEDED_STATE) {
    return (
      <ContributeInput
        contractInfo={contractInfo}
        contractAddress={contractAddress}
        userAccount={userAccount}
        etherPrice={etherPrice}
        refreshCampaign={refreshCampaign}
        setRefreshCampaign={setRefreshCampaign}
        setContractInfo={setContractInfo}
      />
    );
  } else if (contractInfo.state === FAILED_STATE) {
    return (
      <ContributeInput
        contractInfo={contractInfo}
        contractAddress={contractAddress}
        userAccount={userAccount}
        etherPrice={etherPrice}
        refreshCampaign={refreshCampaign}
        setRefreshCampaign={setRefreshCampaign}
        setContractInfo={setContractInfo}
      />
    );
  } else if (contractInfo.state === PAID_OUT_STATE) {
    return (
      <ContributeInput
        contractInfo={contractInfo}
        contractAddress={contractAddress}
        userAccount={userAccount}
        etherPrice={etherPrice}
        refreshCampaign={refreshCampaign}
        setRefreshCampaign={setRefreshCampaign}
        setContractInfo={setContractInfo}
      />
    );
  }
}

function ContributeInput(props) {
  const [contributionAmount, setContributionAmount] = useState<string>("");
  const {
    contractInfo,
    contractAddress,
    userAccount,
    etherPrice,
    refreshCampaign,
    setRefreshCampaign,
    setContractInfo,
  } = props;

  const web3 = getWeb3();
  const refreshCampaignComponent = () => {
    setRefreshCampaign(!refreshCampaign);
    console.log("refreshed");
  };

  async function onContribute() {
    console.log("Begin contribute: " + contributionAmount);
    const amount = web3.utils.toWei(contributionAmount, "ether");

    const gasEstimate = await web3.eth.estimateGas({
      value: amount,
      from: userAccount,
      to: contractAddress,
    });

    console.log("Gas estimate: ", gasEstimate);
    console.log(amount, userAccount, contractAddress);

    await web3.eth
      .sendTransaction({
        value: amount,
        from: userAccount,
        to: contractAddress,
        gas: gasEstimate,
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
    setContributionAmount("");
    refreshCampaignComponent();
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
