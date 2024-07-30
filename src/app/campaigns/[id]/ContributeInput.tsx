import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { convertEtherToDollars } from "../../../ethereum/utils";

export default function ContributeInput(props) {
  const [contributionAmount, setContributionAmount] = useState<string>("");
  const [campaignFinished, setCampaignFinished] = useState(
    props.campaignFinished
  );
  const [collectedAmount, setCollectedAmount] = useState(0);
  const etherPrice = props.etherPrice;

  async function onContribute() {
    alert("Contribute: " + contributionAmount);
  }

  const isValidContribution =
    contributionAmount !== "" && !isNaN(parseFloat(contributionAmount));

  return (
    // <div className="flex flex-row justify-start items-end space-x-2">
    //   <TextField
    //     variant="outlined"
    //     label="ETH"
    //     placeholder="Amount to contribute"
    //     value={contributionAmount}
    //     onChange={(e) => setContributionAmount(e.target.value)}
    //   />
    //   {isValidContribution && (
    //     <Typography
    //       component="span"
    //       className="text-green-500 ml-2 absolute bottom-1 right-3"
    //     >
    //       ${convertEtherToDollars(contributionAmount, etherPrice)}
    //     </Typography>
    //   )}
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     onClick={onContribute}
    //     disabled={!isValidNumber(contributionAmount)}
    //   >
    //     Contribute
    //   </Button>
    // </div>
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
            sx={{ fontSize: "0.875rem", backgroundColor: "white" }} // Adjust font size if needed
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
