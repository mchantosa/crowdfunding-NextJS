"use client";

import Title from "./components/Title";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MediaCard from "./components/MediaCard";
import Subtitle from "./components/Subtitle";

export default function Page() {
  const theme = useTheme();
  return (
    <>
      <Title>Welcome to Crowdfund</Title>
      <Subtitle>
        Use this application to create and interact with an Ethereum
        crowdfunding campaign
      </Subtitle>
      <Box
        sx={{
          paddingY: "12px",
          paddingX: "48px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.primary.main, // Secondary color
            textAlign: "center", // Center text
            marginY: 2, // Vertical margin for spacing
            fontWeight: 600, // Semi-bold
            fontSize: {
              xs: ".75rem",
              sm: ".75rem",
              md: "1rem",
              lg: "1.25rem",
              xl: "1.25rem",
            },
            lineHeight: {
              xs: "1.2", // Line height for extra-small screens
              sm: "1.4", // Line height for small screens
              md: "1.6", // Line height for medium screens
              lg: "1.8", // Line height for large screens
              xl: "2", // Line height for extra-large screens
            },
          }}
        >
          This application has a Metamask browser extension dependency
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "stretch",
          gap: 6,
          padding: 2,
        }}
      >
        <MediaCard
          title="Create a Campaign"
          description="Create a crowdfunding campaign on the Ethereum blockchain. Designate a target value (ETH), duration (seconds- I'm going to fix this), and beneficiary (Ethereum account), and deploy your smart contract to the network of your choice. This application supports Ethereum Mainnet and Sepolia (you can test before you commit). Be sure to copy your campaign address, this application does not persist that data yet."
          media="/images/graffiti.jpg"
          mediaTitle="Zoe's graffiti art"
          _href="/new-campaign"
        />

        <MediaCard
          title="Interact with a Campaign"
          description="Interact with an existing campaign. If the campaign status is 'ongoing' anyone can contribute. If the deadline has passed, anyone can finish the campaign. Finishing the campaign will set the status to 'succeeded' if the target was met and 'failed' if the target was not met. If the contract has a 'succeeded' status, the owner can collect the funds. If the contract has a 'failed' status, each contributor can withdraw their contribution. The owner of the campaign can cancel it, this will set the campaign status to 'failed'."
          media="/images/coffee2.jpg"
          mediaTitle="A peppermint hot chocolate and a latte from Storyville Coffee Company"
          _href="/campaigns"
        />
      </Box>
    </>
  );
}
