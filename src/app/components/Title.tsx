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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          padding: "10px",
          marginTop: 4,
          marginBottom: { xs: 2, md: 4 },
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
              xs: "1.25rem",
              sm: "1.5rem",
              md: "1.75rem",
              lg: "2rem",
              xl: "2rem",
            },
          }}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
