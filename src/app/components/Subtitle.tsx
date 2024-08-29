import { Typography, Box } from "@mui/material";
export default function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        paddingY: "12px",
        paddingX: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "70%" } }}>
        <Typography
          variant="body1"
          sx={{
            color: "#555",
            fontFamily: "monospace",
            textAlign: "center",
            fontSize: {
              xs: "1.25rem",
              sm: "1.25rem",
              md: "1.5rem",
              lg: "1.75rem",
              xl: "1.75rem",
            },
            lineHeight: {
              xs: "1.2",
              sm: "1.4",
              md: "1.6",
              lg: "1.8",
              xl: "2",
            },
          }}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
