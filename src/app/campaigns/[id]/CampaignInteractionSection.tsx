import React, { useState } from "react";
import Button from "@mui/material/Button";
import Contribute from "./Contribute";
import CancelCampaign from "./CancelCampaign";
import Withdraw from "./Withdraw";
import FinishCampaign from "./FinishCampaign";
import { STATES } from "../../../ethereum/utils";

export default function campaignInteractionSection(props) {
  const {
    contract,
    web3,
    contractInfo,
    loadCampaignData,
    contractAddress,
    userAccount,
    etherPrice,
    setContractInfo,
  } = props;

  if (contractInfo.state === STATES.PAID_OUT_STATE) {
    return <>PAID OUT STATE PENDING</>;
  } else if (contractInfo.state === STATES.FAILED_STATE) {
    return (
      <Withdraw
        loadCampaignData={loadCampaignData}
        contractAddress={contractAddress}
        contractInfo={contractInfo}
        web3={web3}
        contract={contract}
        userAccount={userAccount}
      />
    );
  } else if (contractInfo.state === STATES.SUCCEEDED_STATE) {
    return (
      <Collect
        contractInfo={contractInfo}
        setContractInfo={setContractInfo}
        contract={contract}
        userAccount={userAccount}
      />
    );
  } else {
    if (!contractInfo.pastDeadline) {
      return (
        <>
          <Contribute
            loadCampaignData={loadCampaignData}
            contractAddress={contractAddress}
            userAccount={userAccount}
            etherPrice={etherPrice}
            web3={web3}
          />
          {contractInfo.beneficiary.toLowerCase() ===
            userAccount.toLowerCase() && (
            <CancelCampaign
              loadCampaignData={loadCampaignData}
              contractAddress={contractAddress}
              contract={contract}
              userAccount={userAccount}
            />
          )}
        </>
      );
    } else {
      return (
        <FinishCampaign
          contractInfo={contractInfo}
          setContractInfo={setContractInfo}
          contract={contract}
          userAccount={userAccount}
        />
      );
    }
  }
}

function Collect(props) {
  const { contractInfo, setContractInfo, contract, userAccount } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={async () => {
        console.log("Collect");
        try {
          // Attempt to finish the campaign
          await contract.methods.collect().send({ from: userAccount });
          //If successful, update the contract information
          setContractInfo({
            ...contractInfo,
            state: SUCCEEDED_STATE,
          });
          console.log("Collect successful");
        } catch (error) {
          // Handle any errors that occur during the transaction
          console.error("Error collecting:", error);
        }
      }}
    >
      {" "}
      Collect{" "}
    </Button>
  );
}
