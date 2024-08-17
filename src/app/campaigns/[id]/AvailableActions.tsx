import { STATES } from "../../../ethereum/utils";
import { Typography } from "@mui/material";
import theme from "../../../theme/theme";
export default function AvailableActions(props) {
  const { contractInfo, userAccount } = props;
  if (contractInfo.state === STATES.PAID_OUT_STATE) {
    return <p>None</p>;
  } else if (contractInfo.state === STATES.ONGOING_STATE) {
    if (contractInfo.pastDeadline) {
      return (
        <Typography
          sx={{
            color: theme.palette.secondary.main,
          }}
        >
          Finish Campaign (anyone)
        </Typography>
      );
    } else {
      if (
        userAccount.toLowerCase() === contractInfo.beneficiary.toLowerCase()
      ) {
        return (
          <>
            <Typography
              sx={{
                color: "#22c55e",
              }}
            >
              Contribute (anyone)
            </Typography>
            <Typography
              sx={{
                color: theme.palette.secondary.main,
              }}
            >
              Cancel (owner)
            </Typography>
          </>
        );
      } else {
        return (
          <>
            <Typography
              sx={{
                color: "#22c55e",
              }}
            >
              Contribute (anyone)
            </Typography>
            <p>Cancel (owner)</p>
          </>
        );
      }
    }
  } else if (contractInfo.state === STATES.FAILED_STATE) {
    if (contractInfo.totalCollected > BigInt(0)) {
      return <p>{contractInfo.totalCollected} Withdraw (contributors)</p>;
    } else {
      return <p>None (all funds are withdrawn)</p>;
    }
  } else {
    return (
      <Typography
        sx={{
          color: theme.palette.secondary.main,
        }}
      >
        Collect
      </Typography>
    );
  }
}
