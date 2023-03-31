import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

function Popup({ openPopup }) {
  const [open, setOpen] = useState(openPopup);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: "flex", alignItems: "center" }}
      >
        {"Alert"}
        <ErrorIcon sx={{ marginLeft: "0.5rem" }} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your profile is incomplete ! Please add all details and Complete your
          Profile..
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link
          to={"/profile"}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Button onClick={handleClose}>Go to Profile</Button>
        </Link>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
