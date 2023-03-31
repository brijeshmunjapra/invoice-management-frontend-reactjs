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
import { getProjects } from "../../../Redux/Actions/ProjectAction";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import DeleteProject from "../../DeleteVendor/DeleteProject";
import ProjectModal from "../../utils/ProjectModal";
import EditIcon from "@mui/icons-material/Edit";
import SnackbarPopup from "../../utils/Snackbar";
import DeleteAltIcon from "@mui/icons-material/Delete";
import { ThemeContext } from "../../utils/ThemeContext";

import "./index.scss";

export default function Projects() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const { theme } = useContext(ThemeContext);

  const [isEdit, setIsEdit] = useState(false);
  const [editInput, setEditInput] = useState();
  const [editInputID, setEditInputID] = useState();

  const [deleteID, setDeleteID] = useState();
  const [open, setOpen] = useState(false);
  const [openChild, setOpenChild] = useState(false);
  const [add, setAdd] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();

  const myprojects = useSelector(
    (state) => state?.ProjectReducer?.projectList?.data
  );

  const deletedData = useSelector(
    (state) => state?.ProjectReducer?.deleteProject
  );

  let length = myprojects?.length === undefined ? 0 : myprojects?.length;

  useEffect(() => {
    dispatch(getProjects());
  }, [add, open, openChild]);

  const handleCloseChild = () => {
    setOpenChild(false);
  };
  const handleChangePage = (e, newPage) => {
    e.preventDefault();
    setPage(newPage);
  };

  const handleCloseProjectModal = () => {
    setOpen(false);
    setIsEdit(false);
    setAdd(false);
  };

  useEffect(() => {
    if (deletedData?.data && deletedData?.data?.status === 200) {
      setSnackbarStatus("error");
      setSnackbarMessage("Project deleted successfully");
    } else {
      setSnackbarStatus("warning");
      setSnackbarMessage("Something went wrong");
    }
    // console.log(deletedData, "delete");
  }, [deletedData]);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setSnackbarStatus("");
  };
  const columns = [
    { id: "name", label: "PROJECT-NAME", align: "left", width: "15%" },
    { id: "subVendor", label: "VENDOR-NAME", width: "20%" },
    {
      id: "startDate",
      label: "START-DATE",
      width: "12%",
      align: "left",
    },
    {
      id: "endDate",
      label: "END-DATE",
      width: "20%",
      align: "center",
    },
    {
      id: "amount",
      label: "AMOUNT",
      width: "12%",
      align: "right",
    },
    {
      id: "paidAmount",
      label: "PAID AMOUNT",
      width: "12%",
      align: "right",
    },
    {
      id: "status",
      label: "STATUS",
      width: "10%",
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

  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(0),
      month = datePart[1],
      day = datePart[2];

    return day + "-" + month + "-" + year;
  }

  return (
    <>
      {isEdit && (
        <ProjectModal
          titleText={"Edit Project Data"}
          primaryBtn={"Update"}
          secondaryBtn={"Cancel"}
          handleCloseProjectModal={handleCloseProjectModal}
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
        Add New Project
      </Button>

      <ProjectModal
        titleText={"Add New Project"}
        primaryBtn={"Add"}
        secondaryBtn={"Cancel"}
        handleCloseProjectModal={handleCloseProjectModal}
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
        <TableContainer sx={{ height: "fit-content" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell
                    key={i}
                    align={column.align}
                    sx={{
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
              {myprojects
                ?.slice(page * 5, page * 5 + 5)
                ?.map((project, idx) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={idx}
                      sx={{ cursor: "pointer" }}
                    >
                      {columns.map((column, index) => {
                        let value = project[column.id];
                        if (
                          column.id === "startDate" ||
                          column.id === "endDate"
                        ) {
                          value = formatDate(project[column.id]);
                        }

                        if (
                          column.id === "paidAmount" ||
                          column.id === "amount"
                        ) {
                          value = project[column.id].toFixed(2);
                        }
                        return (
                          <TableCell
                            key={index}
                            align={column.align}
                            // sx={theme === "dark" && { color: "#cecaca" }}
                            className={theme === "dark" ? "cellDark" : "cell"}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                            {(column.id === "paidAmount" ||
                              column.id === "amount") &&
                              " ₹"}
                            {column.id === "status" ? (
                              value ? (
                                <CheckCircleIcon color="success" />
                              ) : (
                                <PendingIcon color="warning" />
                              )
                            ) : (
                              ""
                            )}
                            {column.id === "edit" && (
                              <EditIcon
                                sx={{
                                  marginLeft: ".5rem",
                                  color: "#21263c",
                                  fontSize: "22px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setOpen(true);
                                  setIsEdit(true);
                                  setEditInput(project);
                                  setEditInputID(project?._id);
                                }}
                              />
                            )}
                            {column.id === "delete" && (
                              <DeleteAltIcon
                                sx={{ cursor: "pointer", color: "#D23369" }}
                                onClick={() => {
                                  setOpenChild(true);
                                  setEditInput(project);
                                  setDeleteID(project?._id);
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

        <DeleteProject
          handleCloseChild={handleCloseChild}
          deleteID={deleteID}
          style={style}
          openChild={openChild}
          setOpenSnackbar={setOpenSnackbar}
        />
        {openSnackbar && (
          <SnackbarPopup
            openSnackbar={openSnackbar}
            handleClose={handleCloseSnack}
            snackbarStatus={snackbarStatus}
            snackbarMessage={snackbarMessage}
          />
        )}
      </Paper>
    </>
  );
}
