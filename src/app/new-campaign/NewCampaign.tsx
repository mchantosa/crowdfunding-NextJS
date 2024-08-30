"use client";
import { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { deployContract } from "../../utils/web3/web3";
// import { getWeb3 } from "../../utils/web3/web3";
// import Web3 from "web3";
import Loading from "../components/Loading";
import Message from "../components/Message";
import theme from "../../theme/theme";
import { useWeb3Context } from "../context/Web3Context";

export default function Page() {
  const { web3, userAccount } = useWeb3Context(); 
  const [contractAddress, setContractAddress] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [contractCreated, setContractCreated] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    console.log({ name, duration, beneficiaryAddress, amount });
    setLoading(true);
    await deployContract(
      web3,
      userAccount,
      [name, amount, duration, beneficiaryAddress],
      setContractAddress,
      setLoading,
      setContractCreated,
      confirmationEmail
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Set children to be in column format
          alignItems: "center", // Left align the children
          gap: 2, // Space between elements
          paddingY: 6,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Campaign name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            width: "250px",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Target Amount"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{
            width: "250px",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Duration (minutes)"
          variant="outlined"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          sx={{
            width: "250px",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Beneficiary address"
          variant="outlined"
          value={beneficiaryAddress}
          onChange={(e) => setBeneficiaryAddress(e.target.value)}
          sx={{
            width: "250px",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Confirmation email"
          variant="outlined"
          value={confirmationEmail}
          onChange={(e) => setConfirmationEmail(e.target.value)}
          sx={{
            width: "250px",
          }}
        />
        <Button variant="contained" onClick={handleClick}>
          Create Campaign
        </Button>
      </Box>
      {loading && (
        <Loading>
          Your campaign is being deployed, a confirmation email with the
          campaign address will be sent to{" "}
          <span style={{ color: theme.palette.primary.main }}>
            {confirmationEmail}
          </span>
        </Loading>
      )}
      {contractCreated && (
        <Message>
          Your campaign has been deployed to the address{" "}
          <span style={{ color: theme.palette.primary.main }}>
            {contractAddress}
          </span>
          , a confirmation email with the campaign address was sent to{" "}
          <span style={{ color: theme.palette.primary.main }}>
            {confirmationEmail}
          </span>
          . Please save this address for your records.
          <br />
          <Button
            variant="contained"
            onClick={() => router.push(`/campaigns/${contractAddress}`)}
            sx={{
              marginTop: 2,
              color: "white",
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Go to your campaign
          </Button>
        </Message>
      )}
    </>
  );
}
