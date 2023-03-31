import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarPopup(props) {
  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
      }}
    >
      <Snackbar
        open={props.openSnackbar}
        autoHideDuration={3000}
        onClose={props.handleClose}
      >
        <Alert
          onClose={props.handleClose}
          severity={props.snackbarStatus}
          sx={{ width: "100%", margin: "auto" }}
        >
          {props.snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
