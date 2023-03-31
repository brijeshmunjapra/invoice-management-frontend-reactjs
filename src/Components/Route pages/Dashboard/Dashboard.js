import { Divider, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";

import { Pagination } from "@mui/material";
import usePagination from "../../utils/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { getVendors } from "../../../Redux/Actions/Action";
import QueueIcon from "@mui/icons-material/Queue";
import VendorModal from "../../utils/VendorModal";
import AddVendorModal from "../../AddVendorModal";
import ProjectModal from "../../utils/ProjectModal";
import "./index.scss";
import { getProjects } from "../../../Redux/Actions/ProjectAction";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ThemeContext } from "../../utils/ThemeContext";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  let [page, setPage] = useState(1);
  let [pageProject, setPageProject] = useState(1);

  const [open, setOpen] = useState(false);

  const myvendors = useSelector((state) => state?.VendorReducer?.vendorData);
  const myprojects = useSelector(
    (state) => state?.ProjectReducer?.projectList?.data
  );

  useEffect(() => {
    dispatch(getVendors());
    localStorage.setItem("theme", "light");
  }, [open]);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const PER_PAGE = 5;

  const state =
    myvendors?.length === undefined ? 0 : myvendors?.length / PER_PAGE;
  const stateProject =
    myprojects?.length === undefined ? 0 : myprojects?.length / PER_PAGE;
  const count = Math.ceil(state);
  const countProject = Math.ceil(stateProject);

  const VENDOR_DATA = usePagination(myvendors, PER_PAGE);
  const PROJECT_DATA = usePagination(myprojects, PER_PAGE);

  const handleChange = (e, p) => {
    e.preventDefault();
    setPage(p);
    VENDOR_DATA.jump(p);
  };

  const handleChangeProject = (e, p) => {
    e.preventDefault();
    setPageProject(p);
    PROJECT_DATA.jump(p);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseVendorModal = (resetForm) => {
    setOpen(false);
    resetForm();
  };

  const black_white = {
    color: theme === "dark" ? "#fff" : "black",
  };

  let total = 0;
  myprojects?.map(
    (vend) => (total = total + (vend?.amount - vend?.paidAmount))
  );

  const getAmountByVendor = (vendorName) => {
    const projectsbyvendor = myprojects?.filter(
      (vend) => vend?.subVendor === vendorName
    );
    let totalAmount = 0;
    const amount = projectsbyvendor.map(
      (vend) => (totalAmount = totalAmount + (vend?.amount - vend?.paidAmount))
    );
    return amount[amount.length - 1]
      ? amount[amount.length - 1].toFixed(2)
      : "0.00";
  };

  return (
    <Box className="main">
      <Box className="firstwrapper">
        <Box className={theme === "dark" ? "receivablesDark" : "receivables"}>
          <Typography className="title">Total Receivables</Typography>
        </Box>
        <Box className="box">
          <Typography sx={black_white}>
            Total Outstanding ₹ {total.toFixed(2)}
          </Typography>
          <Box
            className={theme === "dark" ? "progressbarDark" : "progressbar"}
          ></Box>
        </Box>

        <Box className="data">
          <Typography sx={black_white}>₹0.00</Typography>
          <Divider
            sx={{
              orientation: "vertical",
              borderWidth: "1px",
              height: "80%",
              margin: "0.35rem 0",
            }}
            flexItem
          ></Divider>
          <Typography sx={black_white}>₹0.00</Typography>
          <Typography sx={black_white}>₹0.00</Typography>
          <Typography sx={black_white}>₹0.00</Typography>
          <Typography sx={black_white}>₹0.00</Typography>
        </Box>
      </Box>
      <Box className="secondwrapper">
        <Box className="projects">
          <Box
            className={theme === "dark" ? "projecttitleDark" : "projecttitle"}
          >
            <Typography sx={black_white}>Projects</Typography>
          </Box>
          <Box className="subtitle">
            <Typography sx={black_white}>Name</Typography>
            <Typography sx={black_white}>Status</Typography>
          </Box>
          <Box className="projectdata">
            {PROJECT_DATA?.currentData()?.map((v) => {
              return (
                <ListItem key={v._id}>
                  <Box
                    className={
                      theme === "dark" ? "projectsubdataDark" : "projectsubdata"
                    }
                  >
                    {v.name}
                  </Box>
                  <Box
                    className={
                      theme === "dark" ? "projectsubdataDark" : "projectsubdata"
                    }
                  >
                    {v.subVendor}
                  </Box>

                  <Box className="projectsubdata">
                    {v.status ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <PendingIcon color="warning" />
                    )}
                  </Box>
                </ListItem>
              );
            })}
          </Box>
          <Box className="pageButtons">
            <Pagination
              className={theme === "dark" ? "paginationDark" : "pagination"}
              count={countProject}
              size="medium"
              page={pageProject}
              variant="outlined"
              shape="rounded"
              onChange={handleChangeProject}
            />
          </Box>
        </Box>
        <Box className="projects">
          <Box
            className={theme === "dark" ? "projecttitleDark" : "projecttitle"}
          >
            <Typography sx={black_white}>Vendors</Typography>

            <QueueIcon onClick={handleClickOpen} sx={{ cursor: "pointer" }} />
          </Box>
          <Box className="subtitle">
            <Typography sx={black_white}>Name</Typography>
            <Typography sx={black_white}>Outstanding Amount</Typography>
          </Box>
          <Box className="projectdata">
            {VENDOR_DATA?.currentData()?.map((v) => {
              return (
                <ListItem key={v._id}>
                  <Box sx={black_white}>{v.name}</Box>

                  <Box sx={black_white}>{getAmountByVendor(v.name) + " ₹"}</Box>
                </ListItem>
              );
            })}
          </Box>
          <Box className="pageButtons">
            <Pagination
              className={theme === "dark" ? "paginationDark" : "pagination"}
              count={count}
              size="medium"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
      <AddVendorModal
        handleCloseVendorModal={handleCloseVendorModal}
        open={open}
      />
    </Box>
  );
}
