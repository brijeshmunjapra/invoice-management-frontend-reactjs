import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { getVendors } from "../../../Redux/Actions/Action";
import VendorModal from "../../utils/VendorModal";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import DeleteModal from "../../DeleteVendor/DeleteModal";

import AddVendorModal from "../../AddVendorModal";
import EditIcon from "@mui/icons-material/Edit";
import SnackbarPopup from "../../utils/Snackbar";
import EditVendorModal from "../../EditVendorModal";
import DeleteAltIcon from "@mui/icons-material/Delete";
import { ThemeContext } from "../../utils/ThemeContext";
import "./index.scss";

const columns = [
  { id: "name", label: "VENDOR-NAME", align: "left", width: "15%" },
  { id: "email", label: "EMAIL", width: "20%" },
  {
    id: "phoneNumber",
    label: "PHONE NUMBER",
    width: "12%",
    align: "left",
  },
  {
    id: "additionalPhoneNumber",
    label: "PHONE NUMBER",
    width: "12%",
    align: "left",
  },
  {
    id: "gstNumber",
    label: "GST NUMBER",
    width: "20%",
    align: "center",
  },
  {
    id: "address",
    label: "ADDRESS",
    width: "20%",
    align: "center",
  },
  {
    id: "edit",
    label: "EDIT",
    width: "10%",
    align: "center",
  },
  {
    id: "delete",
    label: "DELETE",
    width: "10%",
    align: "center",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function Vendors() {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [editInput, setEditInput] = useState();
  const [editInputID, setEditInputID] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const [deleteID, setDeleteID] = useState();
  const [openChild, setOpenChild] = useState(false);
  const [add, setAdd] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  const myvendors = useSelector((state) => state?.VendorReducer?.vendorData);

  const deletedata = useSelector(
    (state) => state?.VendorReducer?.deleteVendorData
  );
  const updateddata = useSelector(
    (state) => state?.VendorReducer?.updateVendorData
  );

  let length = myvendors?.length === undefined ? 0 : myvendors?.length;

  useEffect(() => {
    dispatch(getVendors());
  }, [deletedata, add, isEdit]);

  const handleCloseChild = () => {
    setOpenChild(false);
  };

  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPage(newPage);
  };

  useEffect(() => {
    if (updateddata && updateddata?.status === 200) {
      setSnackbarStatus("info");
      setSnackbarMessage("Vendor details updated");
    }
  }, [updateddata]);

  useEffect(() => {
    if (deletedata && deletedata?.status === 200) {
      setSnackbarStatus("error");
      setSnackbarMessage("Vendor deleted successfully");
    }
  }, [deletedata]);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setSnackbarStatus("");
  };
  const handleCloseVendorModal = () => {
    setOpen(false);
    setIsEdit(false);
    setAdd(false);
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 3000);
  };
  return (
    <>
      {/* {editInputID && (
        <EditVendorModal
          handleCloseVendorModal={handleCloseVendorModalEdit}
          open={open}
          editInput={editInput}
          openSnackbar={openSnackbar}
          setOpenSnackbar={setOpenSnackbar}
          setOpen={setOpen}
          // editInput2={editInput2}
          editInputID={editInputID}
        />
      )} */}
      {isEdit && (
        <VendorModal
          titleText={"Edit Project Data"}
          primaryBtn={"Update"}
          secondaryBtn={"Cancel"}
          handleCloseVendorModal={handleCloseVendorModal}
          open={open}
          editInput={editInput}
          editInputID={editInputID}
        />
      )}
      <Button
        onClick={() => setAdd(true)}
        sx={{
          margin: "0 0 2rem 0",
          float: "right",
          backgroundColor: "#0F3460",
          color: "white",
          border: theme === "light" && "1px solid black",
          boxShadow: "#9b9090 0px 0px 20px",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "white",
            color: "#0F3460",
          },
        }}
      >
        Add New Vendor
      </Button>

      {/* <AddVendorModal
        handleCloseVendorModal={handleCloseVendorModalAdd}
        open={add}
      /> */}

      <VendorModal
        titleText={"Add New Vendor"}
        primaryBtn={"Add"}
        secondaryBtn={"Cancel"}
        handleCloseVendorModal={handleCloseVendorModal}
        open={add}
      />

      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "#9b9090 0px 1px 15px",
          borderRadius: "10px",
        }}
      >
        <TableContainer
          sx={{
            height: "fit-content",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ borderRadius: "10px" }}>
                {columns.map((column, i) => (
                  <TableCell
                    key={i}
                    align={column.align}
                    style={{
                      width: column.width,
                      backgroundColor: "#21263c",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {myvendors?.slice(page * 5, page * 5 + 5)?.map((vendor, idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    {columns.map((column, index) => {
                      const value = vendor[column.id];
                      return (
                        <TableCell
                          key={index}
                          align={column.align}
                          sx={theme === "dark" && { color: "#cecaca" }}
                          className={theme === "dark" ? "cellDark" : "cell"}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}

                          {column.id === "edit" && (
                            <EditIcon
                              sx={{
                                marginLeft: ".5rem",
                                color: "#21263c",
                                fontSize: "22px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setEditInput(vendor);
                                setOpen(true);
                                setIsEdit(true);
                                setEditInputID(vendor?._id);
                                // dispatch(getVendorById(vendor?._id));
                              }}
                            />
                          )}
                          {column.id === "delete" && (
                            <DeleteAltIcon
                              sx={{ cursor: "pointer", color: "#D23369" }}
                              onClick={() => {
                                setOpenChild(true);
                                setDeleteID(vendor?._id);
                              }}
                            />
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={length}
          rowsPerPage={5}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage={false}
          rowsPerPageOptions={[]}
          sx={
            theme === "dark"
              ? { backgroundColor: "#183b4f", color: "#cecaca" }
              : { backgroundColor: "#464e523d" }
          }
        />
        <DeleteModal
          handleCloseChild={handleCloseChild}
          deleteID={deleteID}
          style={style}
          openChild={openChild}
          setOpenSnackbar={setOpenSnackbar}
        />

        <Box>
          {openSnackbar && (
            <SnackbarPopup
              openSnackbar={openSnackbar}
              handleClose={handleCloseSnack}
              snackbarStatus={snackbarStatus}
              snackbarMessage={snackbarMessage}
            />
          )}
        </Box>
      </Paper>
    </>
  );
}
