import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ContributeInput(props) {
  const [contributionAmount, setContributionAmount] = useState<number | string>(
    null
  );
  const [campaignFinished, setCampaignFinished] = useState(
    props.campaignFinished
  );
  const [collectedAmount, setCollectedAmount] = useState(0);

  async function onContribute() {
    alert("Contribute: " + contributionAmount);
  }

  return (
    <div className="flex flex-row justify-start items-end space-x-2">
      <TextField
        variant="outlined"
        label="ETH"
        placeholder="Amount to contribute"
        value={contributionAmount}
        onChange={(e) => setContributionAmount(e.target.value)}
      />
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
