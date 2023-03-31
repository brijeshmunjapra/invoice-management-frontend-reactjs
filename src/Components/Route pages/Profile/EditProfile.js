import { Button } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { style } from "@mui/system";
import { changeUserData, userDataState } from "../../../Redux/Actions/Action";

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
  address: yup.string(),
  phoneNumber: yup.string(),
  gstNumber: yup.string(),
  gstValue: yup.number(),
  cgstValue: yup.number(),
  sgstValue: yup.number(),
});

const textfieldstyle = {
  ".MuiInputBase-root": {
    maxHeight: "40px",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
};

function EditProfile({ edit, setIsEdit }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const formik = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      address: user?.address === "null" ? "" : user?.address,
      phoneNumber: user?.phoneNumber,
      gstNumber: user?.gstNumber,
      gstValue: user?.gstValue,
      cgstValue: user?.cgstValue,
      sgstValue: user?.sgstValue,
    },
    onSubmit: (values, { resetForm }) => {
      values.address = values.address ? values.address : "";
      values.phoneNumber = values.phoneNumber ? values.phoneNumber : "";
      values.gstNumber = values.gstNumber ? values.gstNumber : "";
      values.gstValue = values.gstValue ? values.gstValue : "";
      values.cgstValue = values.cgstValue ? values.cgstValue : "";
      values.sgstValue = values.sgstValue ? values.sgstValue : "";
      values.password = user?.password;

      dispatch(changeUserData(user?._id, values));
      user.address = values.address;
      user.phoneNumber = values.phoneNumber;
      user.gstNumber = values.gstNumber;
      user.gstValue = values?.gstValue;
      user.cgstValue = values?.cgstValue;
      user.sgstValue = values?.sgstValue;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(userDataState(user));
      setIsEdit(false);
      resetForm({ values: null });
    },
    validationSchema: validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          size="small"
          type="name"
          id="name"
          name="name"
          label="Name"
          sx={textfieldstyle}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          size="small"
          type="email"
          id="email"
          name="email"
          label="Email"
          sx={textfieldstyle}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          size="small"
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          label="phoneNumber"
          sx={textfieldstyle}
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        <TextField
          fullWidth
          type="text"
          size="small"
          id="gstNumber"
          name="gstNumber"
          label="gstNumber"
          sx={textfieldstyle}
          value={formik.values.gstNumber}
          onChange={formik.handleChange}
          error={formik.touched.gstNumber && Boolean(formik.errors.gstNumber)}
          helperText={formik.touched.gstNumber && formik.errors.gstNumber}
        />
        <TextField
          fullWidth
          type="text"
          size="small"
          id="address"
          name="address"
          label="address"
          sx={textfieldstyle}
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          fullWidth
          size="small"
          type="number"
          id="gstValue"
          name="gstValue"
          label="GST"
          sx={textfieldstyle}
          value={formik.values.gstValue}
          onChange={formik.handleChange}
          error={formik.touched.gstValue && Boolean(formik.errors.gstValue)}
          helperText={formik.touched.gstValue && formik.errors.gstValue}
        />
        <TextField
          fullWidth
          size="small"
          type="number"
          id="cgstValue"
          name="cgstValue"
          label="CGST"
          sx={textfieldstyle}
          value={formik.values.cgstValue}
          onChange={formik.handleChange}
          error={formik.touched.cgstValue && Boolean(formik.errors.cgstValue)}
          helperText={formik.touched.cgstValue && formik.errors.cgstValue}
        />
        <TextField
          fullWidth
          size="small"
          type="number"
          id="sgstValue"
          name="sgstValue"
          label="SGST"
          sx={textfieldstyle}
          value={formik.values.sgstValue}
          onChange={formik.handleChange}
          error={formik.touched.sgstValue && Boolean(formik.errors.sgstValue)}
          helperText={formik.touched.sgstValue && formik.errors.sgstValue}
        />

        <Button onClick={() => setIsEdit(false)}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default EditProfile;
