"use client";

import React, { useState, useEffect } from "react";
import { getWeb3 } from "../../../../ethereum/utils";
import ContributeInput from "./ContributeInput";
// Material Web Components imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TableFooter from "@mui/material/TableFooter";
import theme from "../../../theme/theme";
import { format } from "date-fns";

const ONGOING_STATE = 0;
const FAILED_STATE = 1;
const SUCCEEDED_STATE = 2;
const PAID_OUT_STATE = 3;

const formatDate = (date) =>
  format(new Date(date), "dd-MMM-yyyy").toUpperCase();

export default function Campaign() {
  const web3 = getWeb3();
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [contractInfo, setContractInfo] = useState({
    name: "N/A",
    targetAmount: 0,
    totalCollected: 0,
    campaignFinished: false,
    deadline: new Date(0),
    isBeneficiary: true,
    collectedAmount: 10,
    contributedAmount: 10,
    state: ONGOING_STATE,
  });

  async function connectWallet() {
    const accounts: string[] = await web3.eth.requestAccounts();
    setCurrentAccount(accounts[0]);
  }

  async function getCurrentConnectedAccount() {
    const accounts: string[] = await web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);
  }

  useEffect(() => {
    getCurrentConnectedAccount();
  }, []);

  window.ethereum.on("accountsChanged", function (accounts: any) {
    if (accounts) {
      setCurrentAccount(accounts[0]);
    }
  });

  if (!currentAccount) {
    return (
      <>
        <Alert severity="info">
          <AlertTitle>Website is not connected to Ethereum</AlertTitle>
          <p>You must first connect your wallet</p>
          <Button variant="contained" color="primary" onClick={connectWallet}>
            Connect Wallet
          </Button>
        </Alert>
      </>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                sx={{
                  //mr: 2,
                  //display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 800,
                  letterSpacing: ".3rem",
                  color: theme.palette.secondary.main,
                  textDecoration: "none",
                }}
              >
                Campaign Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{contractInfo.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Target Amount</TableCell>
              <TableCell>{contractInfo.targetAmount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Collected</TableCell>
              <TableCell>{contractInfo.totalCollected}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Campaign Finished</TableCell>
              <TableCell>{contractInfo.campaignFinished.toString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Deadline</TableCell>
              <TableCell>{formatDate(contractInfo.deadline)}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>
                {campaignInteractionSection(contractInfo)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

function campaignInteractionSection(contractInfo: any) {
  if (contractInfo.state === ONGOING_STATE) {
    return <ContributeInput campaignFinished={contractInfo.campaignFinished} />;
  } else if (contractInfo.state === SUCCEEDED_STATE) {
    return <ContributeInput campaignFinished={contractInfo.isBeneficiary} />;
  } else if (contractInfo.state === FAILED_STATE) {
    return (
      <ContributeInput
        campaignFinished={contractInfo.contributedByCurrentAccount}
      />
    );
  }
}
