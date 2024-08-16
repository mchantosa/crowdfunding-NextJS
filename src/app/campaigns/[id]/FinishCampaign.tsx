import { Button } from "@mui/material";
import { STATES } from "../../../ethereum/utils";
export default function FinishCampaign(props) {
  const { contractInfo, setContractInfo, contract, userAccount } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={async () => {
        console.log("Closing campaign");

        try {
          // Attempt to finish the campaign
          await contract.methods
            .finishedCrowdfunding()
            .send({ from: userAccount });

          //If successful, update the contract information
          setContractInfo({
            ...contractInfo,
            state: STATES.PAID_OUT_STATE,
          });

          console.log("Campaign closed successfully");
        } catch (error) {
          // Handle any errors that occur during the transaction
          console.error("Error closing campaign:", error);
        }
      }}
    >
      Close Campaign
    </Button>
  );
}
