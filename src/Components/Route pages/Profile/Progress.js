import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Progress(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CircularProgress
        sx={{
          minWidth: "70px",
          minHeight: "70px",
          color: "var(--primary-bg)",
        }}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
