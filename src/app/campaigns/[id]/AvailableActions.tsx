import { STATES } from "../../../ethereum/utils";
export default function AvailableActions(props) {
  const { contractInfo } = props;
  if (contractInfo.state === STATES.PAID_OUT_STATE) {
    return <p>None</p>;
  } else if (contractInfo.state === STATES.ONGOING_STATE) {
    if (contractInfo.pastDeadline) {
      return <p className="text-red-500">Finish Campaign (anyone)</p>;
    } else {
      return (
        <>
          <p>Contribute (anyone)</p>
          <p>Cancel (owner)</p>
        </>
      );
    }
  } else if (contractInfo.state === STATES.FAILED_STATE) {
    if (contractInfo.totalCollected > BigInt(0)) {
      return <p>{contractInfo.totalCollected} Withdraw (contributors)</p>;
    } else {
      return <p>None (all funds are withdrawn)</p>;
    }
  } else {
    return <p>Collect(beneficiary)</p>;
  }
}
