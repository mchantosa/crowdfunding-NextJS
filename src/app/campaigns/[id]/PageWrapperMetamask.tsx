"use client";

import React, { useEffect, useState, useContext } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getWeb3 } from "../../../utils/web3/web3";
import { PageContext } from "./page";

export default function PageWrapper_Alert_NoWallet({ children }) {
  const [isWalletInstalled, setIsWalletInstalled] = useState<boolean>(false); // -1 indicates loading
  const { web3, userAccount, setWeb3, setUserAccount } =
    useContext(PageContext);

  useEffect(() => {
    const checkWallet = () => {
      setIsWalletInstalled(!!window.ethereum);
    };

    checkWallet();
  }, []);

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

  if (!isWalletInstalled) {
    // Wallet is not installed, show alert
    return (
      <Alert severity="error">
        <AlertTitle>Wallet not available</AlertTitle>
        <p>Please install a wallet to use this application</p>
      </Alert>
    );
  }

  if (!userAccount) {
    return (
      <Alert severity="info">
        <AlertTitle>Website is not connected to Ethereum</AlertTitle>
        <p>You must first connect your wallet</p>
        {/* <Button variant="contained" color="primary" onClick={connectWallet}>
        Connect Wallet
      </Button> */}
      </Alert>
    );
  }

  // Wallet is installed, show Campaign component
  return (
    <>
      {/* {userAccount} */}
      {children}
    </>
  );
}
