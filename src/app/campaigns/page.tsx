"use client";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  const handleClick = () => {
    if (address) {
      router.push(`/campaigns/${address}`);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 2,
          padding: 2,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Enter campaign address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{
            width: "250px",
          }}
        />
        <Button variant="contained" onClick={handleClick}>
          Search
        </Button>
      </Box>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <p>Please configure your wallet extension to connect to the correct network.</p>
      </Box>
    </>
  );
}
