import { Button } from "@mui/material";
export default function Collect(props) {
  const { loadCampaignData, contractAddress, contract, userAccount } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={async () => {
        console.log("Collect");
        try {
          await contract.methods.collect().send({ from: userAccount });
          await loadCampaignData(contractAddress);
          console.log("Collect successful");
        } catch (error) {
          console.error("Error collecting:", error);
        }
      }}
    >
      Collect
    </Button>
  );
}
