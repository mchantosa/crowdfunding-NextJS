"use client";

import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

export default function Title({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          padding: "10px",
          //border: `2px solid #003366`,
          //transform: "rotate(-2deg)",
          marginY: 4,
          marginX: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#003366", // Midnight Blue
            fontWeight: "bold",
            fontFamily: "monospace",
            textAlign: "center",
            fontSize: {
              xs: "1.25rem", // Font size for small screens
              sm: "1.5rem", // Font size for small screens
              md: "1.75rem", // Font size for medium screens
              lg: "2rem", // Font size for large screens
              xl: "2rem", // Font size for extra large screens
            },
          }}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
