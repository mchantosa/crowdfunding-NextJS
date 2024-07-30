"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  getWeb3,
  getContract,
  convertWeiToEther,
  convertWeiToDollars,
} from "../../../ethereum/utils";
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
//import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";

const ONGOING_STATE = 0;
const FAILED_STATE = 1;
const SUCCEEDED_STATE = 2;
const PAID_OUT_STATE = 3;

const printableStates = new Map();
printableStates.set(ONGOING_STATE, "Ongoing");
printableStates.set(FAILED_STATE, "Failed");
printableStates.set(SUCCEEDED_STATE, "Succeeded");
printableStates.set(PAID_OUT_STATE, "Paid Out");

const formatDate = (date) => {
  if (!date) {
    return "";
  }

  return `${formatInTimeZone(
    date,
    "America/New_York",
    "dd-MMM-yyyy HH:mm"
  )} EST`;
};

function getDateFromSeconds(seconds) {
  const secondsAsNumber =
    typeof seconds === "bigint" ? Number(seconds) : seconds;
  const milliseconds = secondsAsNumber * 1000;
  const date = new Date(milliseconds);
  return date;
}

export default function Campaign() {
  const web3 = useMemo(() => getWeb3(), []);
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [contractInfo, setContractInfo] = useState<any>(undefined);
  const [etherPrice, setEtherPrice] = useState<number>(0);

  const address = useParams().id;

  async function connectWallet() {
    console.log("currentAccount before:", currentAccount);
    try {
      if (!web3) {
        console.error("Web3 not initialized");
        return;
      }
      const accounts: string[] = await web3.eth.getAccounts();
      console.log("Fetched accounts:", accounts);
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        console.error("No accounts found");
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }

  async function getCurrentConnectedAccount() {
    const accounts: string[] = await web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);
  }

  useEffect(() => {
    getCurrentConnectedAccount();
  }, []);

  useEffect(() => {
    if (currentAccount !== undefined) {
      console.log("currentAccount after:", currentAccount);
    }
  }, [currentAccount]);

  useEffect(() => {
    if (contractInfo !== undefined) {
      console.log("contractInfo after:", contractInfo);
    }
  }, [contractInfo]);

  useEffect(() => {
    const fetchEtherPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        setEtherPrice(data.ethereum.usd);
      } catch (error) {
        console.error("Error fetching Ether price:", error);
      }
    };

    fetchEtherPrice();
  }, []);

  useEffect(() => {
    console.log("Fetched Ether price:", etherPrice);
  }, [etherPrice]);

  async function getCampaign(address) {
    if (!currentAccount) return;

    const contract = getContract(web3, address);
    try {
      const name = await contract.methods.name().call();
      const targetAmount = await contract.methods.targetAmount().call();
      const totalCollected = await contract.methods.totalCollected().call();
      const beneficiary = await contract.methods.beneficiary().call();
      const deadlineSeconds = await contract.methods.fundingDeadline().call();
      const contributedAmount = await contract.methods
        .amounts(currentAccount)
        .call();
      const state = Number(await contract.methods.state().call());
      const deadlineDate = getDateFromSeconds(deadlineSeconds);

      setContractInfo({
        name: name,
        targetAmount: targetAmount,
        totalCollected: totalCollected,
        deadline: deadlineDate,
        campaignFinished: deadlineDate < new Date(),
        isBeneficiary:
          currentAccount.toLowerCase() === beneficiary.toLowerCase(),
        contributedAmount: contributedAmount,
        state,
      });
    } catch (error) {
      console.error("Error fetching contract info:", error);
    }
  }

  useEffect(() => {
    getCampaign(address);
  }, [web3, address, currentAccount]);

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

  if (!contractInfo) {
    return (
      <>
        <Alert severity="warning">
          <AlertTitle>Failed to load contract data</AlertTitle>
          <p>
            Check to see if the contract is deployed and you are using the right
            network
          </p>
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
              <TableCell>Campaign Name</TableCell>
              <TableCell>{contractInfo.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Campaign Target Amount</TableCell>
              <TableCell>
                {convertWeiToEther(contractInfo.targetAmount, web3)} ETH (
                <Typography component="span" className="text-green-500">
                  $
                  {convertWeiToDollars(
                    contractInfo.targetAmount,
                    etherPrice,
                    web3
                  )}
                </Typography>
                )
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Funds Collected</TableCell>
              <TableCell>
                {convertWeiToEther(contractInfo.totalCollected, web3)} ETH (
                <Typography component="span" className="text-green-500">
                  $
                  {convertWeiToDollars(
                    contractInfo.totalCollected,
                    etherPrice,
                    web3
                  )}
                </Typography>
                )
              </TableCell>
              <TableCell>{contractInfo.contributedAmount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Campaign State</TableCell>
              <TableCell>{printableStates.get(contractInfo.state)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Deadline</TableCell>
              <TableCell>{formatDate(contractInfo.deadline)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Summary of Your Total Contributions</TableCell>
              <TableCell>
                {convertWeiToEther(contractInfo.contributedAmount, web3)} ETH (
                <Typography component="span" className="text-green-500">
                  $
                  {convertWeiToDollars(
                    contractInfo.contributedAmount,
                    etherPrice,
                    web3
                  )}
                </Typography>
                )
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>
                {campaignInteractionSection(contractInfo, etherPrice)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

function campaignInteractionSection(contractInfo: any, etherPrice: number) {
  if (contractInfo.state === ONGOING_STATE) {
    return (
      <ContributeInput
        campaignFinished={contractInfo.campaignFinished}
        etherPrice={etherPrice}
      />
    );
  } else if (contractInfo.state === SUCCEEDED_STATE) {
    return (
      <ContributeInput
        campaignFinished={contractInfo.isBeneficiary}
        etherPrice={etherPrice}
      />
    );
  } else if (contractInfo.state === FAILED_STATE) {
    return (
      <ContributeInput
        campaignFinished={contractInfo.contributedByCurrentAccount}
        etherPrice={etherPrice}
      />
    );
  }
}
