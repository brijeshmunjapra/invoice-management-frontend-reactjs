import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { logoutClick, changeUserPassword } from "../../../Redux/Actions/Action";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import { ThemeContext } from "../../utils/ThemeContext";
import EditProfile from "./EditProfile";
import Progress from "./Progress";

import * as yup from "yup";
import "./index.scss";

const buttonstyle = {
  backgroundColor: "#0F3460",
  color: "white",
  // border: theme === "light" && "1px solid black",
  boxShadow: "#9b9090 0px 0px 20px",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: "white",
    color: "#0F3460",
  },
};

const validationSchema = yup.object().shape({
  password: yup
    .string()

    .required("Required !")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character(@$!%*#?&)")
    .matches(/\d+/, "One number"),
  changePassword: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "password need to be the same"),
  }),
});

function Profile() {
  const { theme } = useContext(ThemeContext);
  const [editPassword, setIsEditPassword] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [edit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
  }, [localStorage.getItem("user")]);

  const textstyle = theme === "dark" ? "textDark" : "text";

  const inputData = {
    name: user && user?.name,
    email: user && user?.email,
    password: null,
    address: user && user?.address,
    phoneNumber: user && user?.phoneNumber,
    gstNumber: user && user?.gstNumber,
    gstValue: user && user?.gstValue,
    cgstValue: user && user?.cgstValue,
    sgstValue: user && user?.sgstValue,
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      changePassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      setIsEditPassword(false);
      dispatch(
        changeUserPassword(user?._id, {
          ...inputData,
          password: values?.password,
        })
      );
      resetForm({ values: null });
    },
    validationSchema: validationSchema,
  });

  const handlelogout = () => {
    dispatch(logoutClick());
    localStorage.clear();
  };

  let count = 2;

  useEffect(() => {
    if (user.address && user.address !== "") count++;
    if (user.gstNumber && user.gstNumber !== "") count++;
    if (user.phoneNumber && user.phoneNumber !== "") count++;
    if (user.gstValue && user.gstValue !== "" || null) count++;
    if (user.cgstValue && user.cgstValue !== "" || null) count++;
    if (user.sgstValue &&  user.sgstValue !== "" || null) count++;
    setPercentage((count / 8) * 100);
  }, [user]);

  return (
    <Card
      className="profileCard"
      sx={
        theme === "light"
          ? { backgroundColor: "#fff", boxShadow: "#9b9090 0px 1px 15px" }
          : { backgroundColor: "#27495c", boxShadow: "#9b9090 0px 1px 15px" }
      }
    >
      {!editPassword && !edit ? (
        <Box sx={{ width: "80%", height: "fit-content" }}>
          <Box
            sx={{
              p: 0,
              marginBottom: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <Avatar
                  alt="User"
                  sx={{
                    backgroundColor: "var(--primary-bg)",
                    marginBottom: "1rem",
                  }}
                />
                <Typography sx={{ fontSize: "2rem" }} className={textstyle}>
                  {user && user.name}
                </Typography>
              </Box>

              <Progress value={percentage} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography className={textstyle} sx={{ minWidth: "10rem" }}>
                  Email
                </Typography>
                :
                <Typography className={textstyle} sx={{ marginLeft: "2rem" }}>
                  {user && user.email}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography className={textstyle} sx={{ minWidth: "10rem" }}>
                  Address
                </Typography>
                :
                <Typography className={textstyle} sx={{ marginLeft: "2rem" }}>
                  {user && user.address}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography className={textstyle} sx={{ minWidth: "10rem" }}>
                  Phone Number
                </Typography>
                :
                <Typography className={textstyle} sx={{ marginLeft: "2rem" }}>
                  {user && user.phoneNumber}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography className={textstyle} sx={{ minWidth: "10rem" }}>
                  GST Number
                </Typography>
                :
                <Typography className={textstyle} sx={{ marginLeft: "2rem" }}>
                  {user && user.gstNumber}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography className={textstyle} sx={{ minWidth: "10rem" }}>
                  GST Value
                </Typography>
                :
                <Typography className={textstyle} sx={{ marginLeft: "2rem" }}>
                  {user && user.gstValue}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography className={textstyle} sx={{ minWidth: "10rem" }}>
                  CGST Value
                </Typography>
                :
                <Typography className={textstyle} sx={{ marginLeft: "2rem" }}>
                  {user && user.cgstValue}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography className={textstyle} sx={{ minWidth: "10rem" }}>
                  SGST Value
                </Typography>
                :
                <Typography className={textstyle} sx={{ marginLeft: "2rem" }}>
                  {user && user.sgstValue}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="profileButtons">
            <Button sx={buttonstyle} onClick={() => setIsEdit(true)}>
              Edit Profile
            </Button>
            <Button sx={buttonstyle} onClick={() => setIsEditPassword(true)}>
              Change Password
            </Button>

            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Button sx={buttonstyle} onClick={handlelogout}>
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      ) : editPassword ? (
        <form onSubmit={formik.handleSubmit} style={{ width: "80%" }}>
          <Box className="fields">
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
              id="changePassword"
              name="changePassword"
              label="Comfirm Password"
              margin="normal"
              value={formik.values.changePassword}
              onChange={formik.handleChange}
              error={
                formik.touched.changePassword &&
                Boolean(formik.errors.changePassword)
              }
              helperText={
                formik.touched.changePassword && formik.errors.changePassword
              }
              onBlur={formik.handleBlur}
            />
          </Box>
          <Box className="profileButtons">
            <Button
              sx={buttonstyle}
              onClick={() => {
                setIsEditPassword(false);
                formik.resetForm();
              }}
            >
              Cancel
            </Button>
            <Button sx={buttonstyle} type="submit">
              Confirm Change
            </Button>
          </Box>
        </form>
      ) : (
        <EditProfile edit={edit} setIsEdit={setIsEdit} />
      )}
    </Card>
  );
}

export default Profile;
