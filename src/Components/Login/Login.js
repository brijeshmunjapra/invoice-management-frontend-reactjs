import { useFormik } from "formik";
import * as yup from "yup";
import Stack from "@mui/material/Stack";
import { TextField, Button, Box } from "@mui/material";
import "./Login.css";
import { Link } from "react-router-dom";
import Copyright from "./CopyRight";
import { useDispatch, useSelector } from "react-redux";
import { loginClick } from "../../Redux/Actions/Action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const validationSchema = yup.object().shape({
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
});

const Login = () => {
  const loginstate = useSelector((state) => state?.VendorReducer?.respData);
  const errorstate = useSelector((state) => state?.VendorReducer?.errData);
  const navigate = useNavigate();

  useEffect(() => {
    handlelogin();
  }, [loginstate]);

  const handlelogin = () => {
    localStorage.setItem("token", loginstate?.data?.token);

    localStorage.setItem("user", JSON.stringify(loginstate?.data));
    if (loginstate?.data?.token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginClick(values));
    },
    validationSchema: validationSchema,
  });

  return (
    <Box
      className="candles"
      style={{
        backgroundSize: "cover",
        height: "100vh",
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
            label="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onBlur={formik.handleBlur}
          />

          {errorstate?.status !== undefined && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "red",
                height: "2rem",
              }}
            >
              Email or Password is Invalid
            </Typography>
          )}

          <Button
            type="submit"
            variant="outlined"
            sx={{
              marginTop: "3rem",
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
            Login
          </Button>
          <br></br>

          <Link style={{ textDecoration: "none" }} to="/Registration">
            <Button
              type="submit"
              variant="outlined"
              sx={{
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
              Sign Up
            </Button>
          </Link>
        </form>
        <Box sx={{ position: "absolute", bottom: 0 }}>
          <Copyright />
        </Box>
      </div>
    </Box>
  );
};
export default Login;
