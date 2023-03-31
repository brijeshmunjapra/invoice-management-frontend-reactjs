import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Homebars from "../Homebar/Homebars";
import { ThemeContext } from "../utils/ThemeContext";

const PrivateRoutes = () => {
  const loginstate = useSelector((state) => state?.VendorReducer?.respData);
  const logintoken = localStorage.getItem("token");
  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem("default-theme");
    const browserDefault = isBrowserDefaultDark() ? "dark" : "light";
    return localStorageTheme || browserDefault;
  };
  const [theme, setTheme] = useState(getDefaultTheme());

  return logintoken !== "undefined" && loginstate ? (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        style={{
          backgroundColor: theme === "dark" ? "rgb(22 54 73)" : "white",
          height: "100vh",
        }}
      >
        <Homebars />
        <Box sx={{ margin: "7rem 4rem 0rem 15rem" }}>
          <Outlet />
        </Box>
      </div>
    </ThemeContext.Provider>
  ) : (
    <Navigate to="/" />
  );
};
export default PrivateRoutes;
