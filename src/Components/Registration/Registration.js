import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Stack from "@mui/material/Stack";
import { TextField, Button, Box } from "@mui/material";
import "./Registration.css";
import { useDispatch, useSelector } from "react-redux";
import { registrationClick } from "../../Redux/Actions/Action";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Copyright from "../Login/CopyRight";
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

  password: yup
    .string()

    .required("Required !")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character(@$!%*#?&)")
    .matches(/\d+/, "One number"),
  changepassword: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "password need to be the same"),
  }),
});

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const regiState = useSelector((state) => state?.VendorReducer?.regData);
  const regiError = useSelector((state) => state?.VendorReducer?.regErrData);

  useEffect(() => {
    handlelogin();
  }, [regiState]);

  const handlelogin = () => {
    if (regiState !== undefined && regiState?.status === 201) {
      navigate("/");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      changepassword: "",
    },
    onSubmit: (values) => {
      dispatch(registrationClick(values));
    },
    validationSchema: validationSchema,
  });

  return (
    <Box
      className="candles"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

        color: "#f5f5f5",
        backgroundColor: "var(--seconary-bg)",
      }}
    >
      <div className="wrapper">
        <form className="loginStyle" onSubmit={formik.handleSubmit}>
          <div className="logo">
            {" "}
            <Stack direction="row" spacing={2}>
              <Box
                sx={{
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              ></Box>
            </Stack>
          </div>
          <ArrowBackIcon
            onClick={() => navigate("/")}
            className="backClick"
            sx={{ color: "black", cursor: "pointer" }}
          />

          <h1 className="registerstyle">Add Details To Register</h1>
          <TextField
            type="name"
            id="name"
            name="name"
            label="Name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
          />
          <TextField
            type="email"
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onBlur={formik.handleBlur}
          />

          <TextField
            id="password"
            name="password"
            label="Password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onBlur={formik.handleBlur}
          />
          <TextField
            id="changepassword"
            name="changepassword"
            label="Comfirm Password"
            margin="normal"
            value={formik.values.changepassword}
            onChange={formik.handleChange}
            error={
              formik.touched.changepassword &&
              Boolean(formik.errors.changepassword)
            }
            helperText={
              formik.touched.changepassword && formik.errors.changepassword
            }
            onBlur={formik.handleBlur}
          />

          <Button
            type="submit"
            variant="outlined"
            sx={{
              marginTop: "2rem",
              width: "100%",
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
            {" "}
            Register
          </Button>

          {regiError?.status !== undefined && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "red",
                height: "2rem",
                marginTop: "1rem",
              }}
            >
              User Already Exist. Please Login
            </Typography>
          )}
        </form>
        <Box sx={{ position: "absolute", bottom: 0 }}>
          <Copyright />
        </Box>
      </div>
    </Box>
  );
};
export default Registration;
