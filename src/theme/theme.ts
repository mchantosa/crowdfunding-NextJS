"use client";

import { createTheme } from "@mui/material/styles";
import { blue, orange, green } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
    success: green,
  },
});

export default theme;
