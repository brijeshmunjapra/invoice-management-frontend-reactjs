import React from "react";
import * as yup from "yup";

import Stack from "@mui/material/Stack";
import { Link, Typography } from "@mui/material";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://ivorytechnolab.com/">
        Ivory technolab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Copyright;
