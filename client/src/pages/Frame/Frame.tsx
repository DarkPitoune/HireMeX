import React from "react";
import { Paper } from "@mui/material";
import "./Frame.css";

interface Props {
  children: React.ReactNode;
}

const Frame = (props: Props) => (
  <Paper
    sx={{
      p: 2,
      margin: "auto",
      maxWidth: 1000,
      flexGrow: 1,
    }}
    className="frame"
  >
    {props.children}
  </Paper>
);

export default Frame;
