import { STATES } from "../../../utils/web3/web3";
import { Typography } from "@mui/material";
import theme from "../../../theme/theme";
const printableStates = new Map();
printableStates.set(STATES.ONGOING_STATE, "Ongoing");
printableStates.set(STATES.FAILED_STATE, "Failed");
printableStates.set(STATES.SUCCEEDED_STATE, "Succeeded");
printableStates.set(STATES.PAID_OUT_STATE, "Paid Out");

export default function StateLabel(props) {
  const { contractInfo } = props;
  const completed = (
    <Typography
      sx={{
        color: theme.palette.secondary.main,
      }}
    >
      {printableStates.get(contractInfo.state)}
    </Typography>
  );
  const incomplete = (
    <Typography
      sx={{
        color: "#22c55e",
      }}
    >
      {printableStates.get(contractInfo.state)}
    </Typography>
  );

  if (contractInfo.state === STATES.PAID_OUT_STATE) {
    return completed;
  } else if (contractInfo.state === STATES.SUCCEEDED_STATE) {
    return incomplete;
  } else if (contractInfo.state === STATES.ONGOING_STATE) {
    return incomplete;
  } else {
    if (contractInfo.totalCollected > BigInt(0)) {
      return incomplete;
    } else {
      return completed;
    }
  }
}
