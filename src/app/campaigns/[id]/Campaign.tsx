"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
//components
import CampaignInteractionSection from "./CampaignInteractionSection";
import AvailableActions from "./AvailableActions";
import StateLabel from "./StateLabel";
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
import Typography from "@mui/material/Typography";
//utils
import {
  getWeb3,
  getContract,
  convertWeiToEther,
  convertWeiToDollars,
  formatDate,
  getDateFromSeconds,
} from "../../../ethereum/utils";
import Web3 from "web3";

export default function Campaign() {
  const contractAddress = useParams().id;
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [userAccount, setUserAccount] = useState<string>("");
  const [contract, setContract] = useState<any>(undefined);
  const [contractInfo, setContractInfo] = useState<any>(undefined);
  const [etherPrice, setEtherPrice] = useState<number | undefined>(undefined);

  //get web3
  useEffect(() => {
    (async () => {
      const _web3 = await getWeb3();
      if (!_web3) return;
      setWeb3(_web3);
    })();
  }, []);

  //get user account
  useEffect(() => {
    if (!web3) return;
    (async () => {
      const accounts: string[] = await web3.eth.getAccounts();
      setUserAccount(accounts[0]);
    })();
  }, [web3]);

  //get contract
  useEffect(() => {
    if (!web3) return;
    (async () => {
      const _contract = getContract(web3, contractAddress);
      if (!_contract) return;
      setContract(_contract);
    })();
  }, [web3, contractAddress]);

  //get ether price (cached or fresh)
  useEffect(() => {
    const fetchEtherPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        const etherPrice = data.ethereum.usd;
        setEtherPrice(etherPrice);

        // Store the fetched Ether price and the current timestamp in local storage
        localStorage.setItem("etherPrice", etherPrice.toString());
        localStorage.setItem("etherPriceTimestamp", Date.now().toString());
      } catch (error) {
        console.error("Error fetching Ether price:", error);
      }
    };

    const storedEtherPrice = localStorage.getItem("etherPrice");
    const storedTimestamp = localStorage.getItem("etherPriceTimestamp");

    if (storedEtherPrice && storedTimestamp) {
      const timestamp = parseInt(storedTimestamp, 10);
      const now = Date.now();

      if (now - timestamp < 60000) {
        // Use the cached Ether price
        setEtherPrice(parseFloat(storedEtherPrice));
        console.log("Using cached ether price");
      } else {
        // Cache is stale, fetch new price
        fetchEtherPrice();
        console.log("Cache is stale, fetching new ether price");
      }
    } else {
      fetchEtherPrice();
      console.log("No cache, initializing and fetching ether price");
    }
  }, []);

  async function loadCampaignData(contractAddress) {
    if (!userAccount || !web3) return;

    try {
      const name: string = await contract.methods.name().call();
      const targetAmount: bigint = await contract.methods.targetAmount().call();
      const totalCollected: bigint = await contract.methods
        .totalCollected()
        .call();
      const beneficiary: string = await contract.methods.beneficiary().call();
      const deadlineSeconds: bigint = await contract.methods
        .fundingDeadline()
        .call();
      const contributedAmount: bigint = await contract.methods
        .amounts(userAccount)
        .call();
      const state = Number(await contract.methods.state().call());
      const deadlineDate = getDateFromSeconds(deadlineSeconds);
      const pastDeadline = deadlineDate < new Date();

      console.log({
        name,
        targetAmount,
        totalCollected,
        beneficiary,
        deadlineDate,
        contributedAmount,
        state,
        pastDeadline,
      });

      setContractInfo({
        name: name,
        targetAmount: targetAmount,
        totalCollected: totalCollected,
        beneficiary: beneficiary,
        deadline: deadlineDate,
        contributedAmount: contributedAmount,
        state,
        pastDeadline: deadlineDate < new Date(),
      });
    } catch (error) {
      console.error("Error fetching contract info:", error);
    }
  }

  //get contract info
  useEffect(() => {
    (async () => {
      await loadCampaignData(contractAddress);
    })();
  }, [web3, contractAddress, userAccount]);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setUserAccount(accounts[0]);
      } else {
        setUserAccount(undefined); // Handle the case where no account is connected
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  async function connectWallet() {
    try {
      if (!web3) return; //Web3 not initialized
      const accounts: string[] = await web3.eth.getAccounts();
      if (accounts.length > 0) setUserAccount(accounts[0]);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }

  if (!userAccount) {
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
                {convertWeiToEther(contractInfo.targetAmount, web3)} ETH
                {etherPrice ? (
                  <Typography component="span" className="text-green-500 ml-2">
                    ($
                    {convertWeiToDollars(
                      contractInfo.targetAmount,
                      etherPrice,
                      web3
                    )}
                    )
                  </Typography>
                ) : null}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Funds Collected</TableCell>
              <TableCell>
                {convertWeiToEther(contractInfo.totalCollected, web3)} ETH
                {etherPrice ? (
                  <Typography component="span" className="text-green-500 ml-2">
                    ($
                    {convertWeiToDollars(
                      contractInfo.totalCollected,
                      etherPrice,
                      web3
                    )}
                    )
                  </Typography>
                ) : null}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Campaign Status</TableCell>
              <TableCell>
                <StateLabel contractInfo={contractInfo} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Deadline</TableCell>
              <TableCell>{formatDate(contractInfo.deadline)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Available Actions</TableCell>
              <TableCell>
                <AvailableActions
                  contractInfo={contractInfo}
                  userAccount={userAccount}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Summary of Your Total Contributions</TableCell>
              <TableCell>
                {convertWeiToEther(contractInfo.contributedAmount, web3)} ETH
                {etherPrice ? (
                  <Typography component="span" className="text-green-500 ml-2">
                    ($
                    {convertWeiToDollars(
                      contractInfo.contributedAmount,
                      etherPrice,
                      web3
                    )}
                    )
                  </Typography>
                ) : null}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={2}
                sx={{
                  padding: theme.spacing(2), // Padding for better spacing
                  borderTop: `3px solid ${theme.palette.divider}`, // Border for distinction
                }}
              >
                <Typography
                  variant="body2" // Use body2 for smaller font size
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    // color: theme.palette.primary.main,
                    marginRight: theme.spacing(1), // Space between the two spans
                  }}
                >
                  Connected Account:
                </Typography>
                <Typography
                  variant="body2" // Use body2 for smaller font size
                  component="span"
                >
                  {userAccount}
                </Typography>
                <Typography
                  component="p"
                  className="text-green-500"
                  sx={{
                    fontWeight: "bold",
                    //color: theme.palette.secondary.main,
                    marginRight: theme.spacing(1), // Space between the two spans
                  }}
                >
                  {/* <p> Beneficiary: {contractInfo.beneficiary}</p>
                  <p>User Account: {userAccount}</p> */}
                  {contractInfo.beneficiary.toLowerCase() ===
                    userAccount.toLowerCase() && " (owner)"}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <CampaignInteractionSection
                  contract={contract}
                  web3={web3}
                  contractInfo={contractInfo}
                  contractAddress={contractAddress}
                  userAccount={userAccount}
                  etherPrice={etherPrice}
                  loadCampaignData={loadCampaignData}
                  setContractInfo={setContractInfo}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
