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
import { editVendorDetail } from "../Redux/Actions/Action";
import SnackbarPopup from "./utils/Snackbar";

const validationSchema = yup.object().shape({
  name: yup.string().required("Required !"),
  email: yup
    .string()
    .email("Invalid Email")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    )

    .required("Required !"),
  phoneNumber: yup.string().required("Required !"),
  additionalPhoneNumber: yup.string(),
  gstNumber: yup.string().required("Required !"),
  address: yup.string().required("Required !"),
});

export default function FormDialog({
  handleCloseVendorModal,
  open,
  openSnackbar,
  setOpenSnackbar,
  editInput,
  editInput2,
  editInputID,
}) {
  const dispatch = useDispatch();

  // editInput2 && console.log(editInput2, "editInput2 ");

  // const initial = {
  //   name: editInput2 && editInput2?.name,
  //   email: editInput2 && editInput2?.email,
  //   phoneNumber: editInput2 && editInput2?.phoneNumber,
  //   additionalPhoneNumber: editInput2 && editInput2?.additionalPhoneNumber,
  //   gstNumber: editInput2 && editInput2?.gstNumber,
  //   address: editInput2 && editInput2?.address,
  // };
  // useEffect(() => {}, [editInput]);

  // const initial =

  // const initialEmpty = {
  //   name: "",
  //   email: "",
  //   phoneNumber: "",
  //   additionalPhoneNumber: "",
  //   gstNumber: "",
  //   address: "",
  // };

  // const { _id } = editInput2 !== undefined && editInput2;
  const { _id } = editInput !== undefined && editInput;

  const formik = useFormik({
    initialValues: {
      name: editInput && editInput?.name,
      email: editInput && editInput?.email,
      phoneNumber: editInput && editInput?.phoneNumber,
      additionalPhoneNumber: editInput && editInput?.additionalPhoneNumber,
      gstNumber: editInput && editInput?.gstNumber,
      address: editInput && editInput?.address,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(editVendorDetail(_id, values));
      handleCloseVendorModal();

      resetForm({ values: null });
      setOpenSnackbar(true);

      // console.log(editInput);
      // setEditInput(initialEmpty);
    },
    validationSchema: validationSchema,
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleCloseVendorModal()}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              borderRadius: "10px",
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, padding: "2rem 2rem 0 2rem" }}>
          Edit Vendor
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              type="name"
              id="name"
              name="name"
              label="Name"
              sx={{ marginBottom: "20px", marginTop: "20px" }}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              type="email"
              id="email"
              name="email"
              label="Email"
              sx={{ marginBottom: "20px" }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              label="phoneNumber"
              sx={{ marginBottom: "20px" }}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
            <TextField
              fullWidth
              type="tel"
              id="additionalPhoneNumber"
              name="additionalPhoneNumber"
              label="additionalPhoneNumber"
              sx={{ marginBottom: "20px" }}
              value={formik.values.additionalPhoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.additionalPhoneNumber &&
                Boolean(formik.errors.additionalPhoneNumber)
              }
              helperText={
                formik.touched.additionalPhoneNumber &&
                formik.errors.additionalPhoneNumber
              }
            />
            <TextField
              fullWidth
              type="text"
              id="gstNumber"
              name="gstNumber"
              label="gstNumber"
              sx={{ marginBottom: "20px" }}
              value={formik.values.gstNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.gstNumber && Boolean(formik.errors.gstNumber)
              }
              helperText={formik.touched.gstNumber && formik.errors.gstNumber}
            />
            <TextField
              fullWidth
              type="text"
              id="address"
              name="address"
              label="address"
              sx={{ marginBottom: "20px" }}
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </DialogContent>
          <DialogActions sx={{ marginBottom: "1rem", marginRight: "1rem" }}>
            <Button
              onClick={() => handleCloseVendorModal()}
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
              Cancel
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
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
