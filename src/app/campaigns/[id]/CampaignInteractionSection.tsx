import React, { useState } from "react";
import Button from "@mui/material/Button";
import Contribute from "./Contribute";
import CancelCampaign from "./CancelCampaign";
import Withdraw from "./Withdraw";
import FinishCampaign from "./FinishCampaign";
import Collect from "./Collect";
import { STATES } from "../../../utils/web3/web3";

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
    return <>CAMPAIGN PAID OUT, NO FURTHER ACTIONS AVAILABLE</>;
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
        loadCampaignData={loadCampaignData}
        contractAddress={contractAddress}
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
          loadCampaignData={loadCampaignData}
          contractAddress={contractAddress}
          contract={contract}
          userAccount={userAccount}
        />
      );
    }
  }
}
