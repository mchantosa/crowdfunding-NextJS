"use client";

import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Campaign from "./Campaign";
import Loading from "../../components/Loading";
import { useTheme } from "@mui/material";

export default function Page({ params }: { params: { id: string } }) {
  const [isWalletInstalled, setIsWalletInstalled] = useState<boolean>(false); // -1 indicates loading

  useEffect(() => {
    const checkWallet = () => {
      setIsWalletInstalled(!!window.ethereum);
    };

    checkWallet();
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

  // Wallet is installed, show Campaign component
  return <Campaign />;
}
