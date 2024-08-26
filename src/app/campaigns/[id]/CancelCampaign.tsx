import { Button } from "@mui/material";
import { STATES } from "../../../utils/web3/web3";

export default function CancelCampaign(props) {
  const { loadCampaignData, contractAddress, contract, userAccount } = props;
  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{
        color: "#FFFFFF",
      }}
      onClick={async () => {
        console.log("Cancel campaign");
        try {
          // Attempt to finish the campaign
          await contract.methods
            .cancelCrowdfunding()
            .send({ from: userAccount });
          //If successful, update the contract information
          await loadCampaignData(contractAddress);
          console.log("Campaign cancelled successfully");
        } catch (error) {
          // Handle any errors that occur during the transaction
          console.error("Error cancelling campaign:", error);
        }
      }}
    >
      Cancel Campaign
    </Button>
  );
}
