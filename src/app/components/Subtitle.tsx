import { Typography, Box } from "@mui/material";
export default function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        paddingY: "12px",
        paddingX: "24px",
        //backgroundColor: "#f5f5f5", // Light gray background for contrast
        //borderLeft: `4px solid #003366`, // Accent border in Midnight Blue
        //borderRadius: "4px",
        //boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)",
        // marginY: 2,
        // marginX: 2,
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center", // Centers vertically
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "75%" } }}>
        <Typography
          variant="body1"
          sx={{
            color: "#555", // Dark text color for readability
            fontFamily: "monospace",
            textAlign: "center",
            fontSize: {
              xs: "1.25rem", // Font size for extra-small screens
              sm: "1.25rem", // Font size for small screens
              md: "1.5rem", // Font size for medium screens
              lg: "2rem", // Font size for large screens
              xl: "2rem", // Font size for extra-large screens
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
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
