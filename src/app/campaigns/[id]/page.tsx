"use client";

import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Campaign from "./Campaign";

export default function Page({ params }: { params: { id: string } }) {
  if (!isWalletPluginInstalled()) {
    return (
      <Alert severity="error">
        <AlertTitle>Wallet not available</AlertTitle>
        <p>Please install a wallet to use this application</p>
      </Alert>
    );
  }

  return (
    <>
      <Campaign />
    </>
  );
}

function isWalletPluginInstalled() {
  return !!window.ethereum;
}
