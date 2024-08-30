// components/PageWrapper.tsx
import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useWeb3Context } from "../context/Web3Context";

export default function PageWrapper({ children }) {
  const { isWalletInstalled, web3, userAccount } = useWeb3Context();
  // web3, userAccount, isWalletInstalled

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (!isWalletInstalled) {
    return (
      <Alert severity="error">
        <AlertTitle>Wallet not available</AlertTitle>
        <p>Please install a wallet to use this application</p>
      </Alert>
    );
  }

  if (!web3 || !userAccount) {
    return (
      <Alert severity="info">
        <AlertTitle>Website is not connected to Ethereum</AlertTitle>
        <p>You must first connect your wallet</p>
      </Alert>
    );
  }

  return <>{children}</>;
}
