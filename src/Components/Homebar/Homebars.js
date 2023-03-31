import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutButton from "../Logout/LogoutButton";
import DescriptionIcon from "@mui/icons-material/Description";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ReportIcon from "@mui/icons-material/Report";
// import { useDispatch } from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";
import "./index.scss";
import logo from "../utils/logu-removebg-preview.png";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../Popup/Popup";
import Tooltip from "@mui/material/Tooltip";
import { userDataState } from "../../Redux/Actions/Action";

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    border: "1px solid #fff",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#8796A5",
    borderRadius: 20 / 2,
  },
}));

export default function Homebars() {
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state?.VendorReducer?.user);
  const { theme, setTheme } = useContext(ThemeContext);

  const [openPopup, setOpenPopup] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(userDataState(user));
  }, []);

  const [warn, setWarn] = useState(
    myUser?.address ===( "" || undefined) ||
      myUser?.phoneNumber === ("" || undefined )|| 
      myUser?.gstNumber ===( "" || undefined) ||
      myUser?.gstValue === (null || "" || undefined) ||
      myUser?.cgstValue === (null || "" || undefined) ||
      myUser?.sgstValue ===( null || ""|| undefined)
      ? true
      : false
  );

  const [check, setIsChecked] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  );

  const handleThemeChange = (e) => {
    setIsChecked(e.target.checked);
    const isCurrentDark = theme === "dark";
    localStorage.setItem("theme", isCurrentDark ? "light" : "dark");
    setTheme(localStorage.getItem("theme"));
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, [theme]);

  useEffect(() => {
    console.log(myUser, "myuser");
    if (
      myUser?.address ===( "" || undefined) ||
      myUser?.phoneNumber === ("" || undefined )|| 
      myUser?.gstNumber ===( "" || undefined) ||
      myUser?.gstValue === (null || "" || undefined) ||
      myUser?.cgstValue === (null || "" || undefined) ||
      myUser?.sgstValue ===( null || ""|| undefined) 
    ) {
      setOpenPopup(true);
      setWarn(true);
    } 
  }, [openPopup, myUser]);

  const Navitems1 = [
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Vendors",
      link: "/vendors",
      icon: <PersonAddIcon />,
    },
    {
      label: "Projects",
      link: "/projects",
      icon: <WorkIcon />,
    },

    {
      label: "Invoices",
      link: "/invoices",
      icon: <DescriptionIcon />,
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "0.5rem" }}>Profile</div>
          <div>
            {warn && (
              <Tooltip title="Please complete your profile" placement="right">
                <ReportIcon sx={{ color: "red" }} />
              </Tooltip>
            )}
          </div>
        </div>
      ),
      link: "/profile",
      icon: <AccountCircleIcon />,
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      {openPopup && <Popup openPopup={openPopup} />}
      <CssBaseline />
      <AppBar
        sx={{
          background: theme === "dark" ? "#1f2541ba" : "#d9def3",
          height: "65px",
          color: "black",
        }}
        open={true}
      >
        <Toolbar>
          <Box className="topbar">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flex: 1,
                color: "var(--primary-bg)",
                display: "flex",
                alignItems: "center",
              }}
              fontWeight="600"
            >
              <Link
                to="/dashboard"
                style={{
                  textDecoration: "none",
                  color: theme === "dark" ? "#fff" : "black",
                  fontWeight: "300",
                }}
              >
                {myUser?.name}
              </Link>
            </Typography>

            <div className="avatar">
              <LogoutButton />
            </div>
            <FormGroup>
              <FormControlLabel
                // sx={
                //    theme === "dark" &&
                //   { color: "#fff" }
                // }
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    onClick={(e) => handleThemeChange(e)}
                    checked={check}
                  />
                }
                label={
                  theme === "dark" ? (
                    <Typography sx={{ fontWeight: "400" }}>DARK</Typography>
                  ) : (
                    <Typography sx={{ fontWeight: "400" }}>LIGHT</Typography>
                  )
                }
              />
            </FormGroup>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={true} className="drawer">
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "white" }}
        >
          <DrawerHeader>
            <DescriptionIcon sx={{ marginRight: "0.5rem" }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginRight: 5, fontWeight: "300" }}
            >
              Invoice
            </Typography>
          </DrawerHeader>
        </Link>

        <Divider sx={{ background: "white" }} />
        <List>
          {Navitems1.map((item, index) => (
            <ListItem
              key={item.label + index}
              disablePadding
              sx={{ display: "block" }}
            >
              <Link
                to={item.link}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "initial",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 2,
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} sx={{ opacity: 1 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
