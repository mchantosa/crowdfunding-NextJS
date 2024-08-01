import { CircularProgress, useTheme } from "@mui/material";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";

export default function Loading({ message }: { message: string }) {
  const theme = useTheme();
  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="absolute top-[30%]">
        <CircularProgress />
      </div>
      <div
        className="absolute top-[40%] text-center"
        style={{ color: theme.palette.primary.main }}
      >
        <p>{message}...</p>
      </div>
    </div>
  );
}
