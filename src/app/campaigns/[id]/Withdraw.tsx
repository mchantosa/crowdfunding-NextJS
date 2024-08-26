import { Button } from "@mui/material";
import { convertWeiToEther } from "../../../utils/web3/web3";
import Typography from "@mui/material/Typography";
export default function Withdraw(props) {
  const {
    loadCampaignData,
    contractAddress,
    contractInfo,
    web3,
    contract,
    userAccount,
  } = props;
  if (contractInfo.totalCollected === BigInt(0)) {
    return <p>WITHDRAWALS COMPLETED, NO FURTHER ACTIONS AVAILABLE</p>;
  }
  if (contractInfo.contributedAmount === BigInt(0)) {
    return <p>NO FUNDS TO WITHDRAW</p>;
  } else {
    const contributedAmount = convertWeiToEther(
      contractInfo.contributedAmount,
      web3
    );
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          console.log("Withdrawing...");
          try {
            await contract.methods.withdraw().send({ from: userAccount });
            await loadCampaignData(contractAddress);
            console.log("Withdraw successful");
          } catch (error) {
            console.error("Error withdrawing:", error);
          }
        }}
      >
        <Typography variant="body1">
          Withdraw
          <Typography
            variant="body2"
            component="span"
            sx={{
              fontSize: "0.875rem",
              ml: 1,
            }}
          >
            ({contributedAmount} ETH)
          </Typography>
        </Typography>
      </Button>
    );
  }
}
