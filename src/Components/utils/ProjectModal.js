import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import SnackbarPopup from "./Snackbar";
import {
  addProject,
  editProjectDetail,
} from "../../Redux/Actions/ProjectAction";
import { getVendors } from "../../Redux/Actions/Action";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

const validationSchema = yup.object().shape({
  name: yup.string().required("Required !"),
  subVendor: yup
    .string()

    .required("Required !"),
  startDate: yup.string().required("Required !"),
  endDate: yup.string().required("Required !"),
  amount: yup.number().required("Required !"),
  paidAmount: yup.number().required("Required !"),
});

export default function FormDialog({
  handleCloseProjectModal,
  open,
  titleText,
  primaryBtn,
  secondaryBtn,
  editInput,
  editInputID,
}) {
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [subVendor, setSubVendor] = useState("");

  const addsuccess = useSelector(
    (state) => state?.ProjectReducer?.addProject?.data
  );
  const adderr = useSelector(
    (state) => state?.ProjectReducer?.addProject?.error
  );
  const vendors = useSelector((state) => state?.VendorReducer?.vendorData);
  useEffect(() => {
    dispatch(getVendors());
  }, []);

  //   const updateddata = useSelector(
  //     (state) => state?.VendorReducer?.updateVendorData
  //   );

  useEffect(() => {
    if (addsuccess && addsuccess?.status === 201) {
      setSnackbarStatus("success");
      setSnackbarMessage("Project added successfully");
    }

    if (adderr && adderr?.status === 409) {
      setSnackbarStatus("error");
      setSnackbarMessage("This project already exist, Please add new project");
    }
  }, [addsuccess]);

  // useEffect(() => {
  //   console.log(adderr);
  // }, [adderr]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setSnackbarStatus("");
  };

  const initial = {
    name: editInput ? editInput?.name : "",
    subVendor: editInput ? editInput?.subVendor : "",
    startDate: editInput ? editInput?.startDate : "",
    endDate: editInput ? editInput?.endDate : "",
    amount: editInput ? editInput?.amount : 0,
    paidAmount: editInput ? editInput?.paidAmount : 0,
  };

  const empty = {
    name: "",
    subVendor: "",
    startDate: "",
    endDate: "",
    amount: 0,
    paidAmount: 0,
  };

  const { _id } = editInput !== undefined && editInput;

  const formik = useFormik({
    initialValues: initial,
    onSubmit: (values, { resetForm }) => {
      if (editInput) {
        dispatch(editProjectDetail(_id, values));
      } else {
        dispatch(addProject(values));
      }

      // editInput
      //   ? dispatch(editVendorDetail(_id, values))
      //   : dispatch(addVendor(values));

      handleCloseProjectModal();
      resetForm({ values: empty });
      setSubVendor("");
      setOpenSnackbar(true);
    },
    validationSchema: validationSchema,
  });

  const handleRadioButtonsStatus = (e) => {
    formik.values.status = e.target.value === "true" ? true : false;
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleCloseProjectModal();
          formik.resetForm();
        }}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              borderRadius: "10px",
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, padding: "2rem 2rem 0 2rem" }}>
          {titleText}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              type="name"
              id="name"
              name="name"
              label="Project Name"
              sx={{ marginBottom: "20px", marginTop: "20px" }}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <FormControl sx={{ marginBottom: "20px" }} fullWidth>
              <InputLabel id="demo-simple-select-label">Vendor</InputLabel>
              <Select
                fullWidth
                label="Vendor"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editInput ? editInput?.subVendor : subVendor}
                onChange={(e) => {
                  setSubVendor(e.target.value);
                  formik.values.subVendor = e.target.value;
                }}
              >
                {vendors &&
                  vendors?.map((vendor, idx) => (
                    <MenuItem key={idx} value={vendor?.name}>
                      {vendor?.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <label htmlFor="startDate" style={{ fontWeight: "700" }}>
              Start Date
            </label>
            <TextField
              fullWidth
              type="date"
              id="startDate"
              name="startDate"
              sx={{ marginBottom: "20px" }}
              value={formik.values.startDate}
              onChange={formik.handleChange}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              helperText={formik.touched.startDate && formik.errors.startDate}
            />
            <label htmlFor="endDate" style={{ fontWeight: "700" }}>
              End Date
            </label>

            <TextField
              fullWidth
              type="date"
              id="endDate"
              name="endDate"
              sx={{ marginBottom: "20px" }}
              value={formik.values.endDate}
              onChange={formik.handleChange}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
            />

            <TextField
              fullWidth
              type="number"
              id="amount"
              name="amount"
              label="Amount (₹)"
              sx={{ marginBottom: "20px" }}
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />

            <TextField
              fullWidth
              type="number"
              id="paidAmount"
              name="paidAmount"
              label="Paid Amount (₹)"
              sx={{ marginBottom: "20px" }}
              value={formik.values.paidAmount}
              onChange={formik.handleChange}
              error={
                formik.touched.paidAmount && Boolean(formik.errors.paidAmount)
              }
              helperText={formik.touched.paidAmount && formik.errors.paidAmount}
            />
            <div style={{ display: "flex" }}>
              <Typography sx={{ marginRight: "0.5rem", fontWeight: "700" }}>
                Project Status :
              </Typography>

              <input
                type="radio"
                id="one"
                name="group"
                value={false}
                // value={editInput && editInput.status ? true : false}
                onChange={(e) => handleRadioButtonsStatus(e)}
                required
              />
              <label htmlFor="one">Pending</label>
              <input
                type="radio"
                id="two"
                name="group"
                value={true}
                // value={editInput && !editInput.status ? true : false}
                onChange={(e) => handleRadioButtonsStatus(e)}
              />
              <label htmlFor="two">Completed</label>
            </div>
          </DialogContent>
          <DialogActions sx={{ marginBottom: "1rem", marginRight: "1rem" }}>
            <Button
              onClick={() => {
                handleCloseProjectModal();
                formik.resetForm();
              }}
              sx={{
                marginRight: "1rem",
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
              {secondaryBtn}
            </Button>
            <Button
              type="submit"
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
              {primaryBtn}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {openSnackbar && (
        <SnackbarPopup
          openSnackbar={openSnackbar}
          handleClose={handleClose}
          snackbarStatus={snackbarStatus}
          snackbarMessage={snackbarMessage}
        />
      )}
    </div>
  );
}
