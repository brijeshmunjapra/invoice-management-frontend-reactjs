import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVendor } from "../../Redux/Actions/Action";

function DeleteModal(props) {
  const dispatch = useDispatch();
  const deleteID = props.deleteID;

  return (
    <>
      <Modal
        open={props.openChild}
        onClose={props.handleCloseChild}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ "& .MuiBox-root": { borderRadius: "10px" } }}
      >
        <Box sx={props.style}>
          <Typography id="modal-modal-title" variant="h6" fontWeight={600}>
            Are you sure want to delete this vendor??
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "2rem",
            }}
          >
            <Button
              onClick={props.handleCloseChild}
              sx={{
                backgroundColor: "#0F3460",
                color: "white",
                border: "1px solid black",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#0F3460",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(deleteVendor(deleteID));
                props.handleCloseChild();
                props.setOpenSnackbar(true);
              }}
              sx={{
                backgroundColor: "crimson",
                color: "white",
                fontWeight: "700",
                border: "1px solid crimson",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#ff1a1a",
                },
              }}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default DeleteModal;
