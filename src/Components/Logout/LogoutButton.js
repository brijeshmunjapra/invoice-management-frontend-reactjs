import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

import { logoutClick } from "../../Redux/Actions/Action";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../utils/ThemeContext";

function ResponsiveAppBar() {
  // const navigate = useNavigate();
  const { theme } = React.useContext(ThemeContext);

  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlelogout = () => {
    dispatch(logoutClick());
    localStorage.clear();
  };

  return (
    <Toolbar disableGutters>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <Avatar
            onClick={handleOpenUserMenu}
            alt="User"
            sx={{
              backgroundColor:
                theme === "dark" ? "#9fc7d9" : "var(--primary-bg)",
            }}
          />
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>Profile</MenuItem>
          </Link>

          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem onClick={handlelogout}>Logout </MenuItem>
          </Link>
        </Menu>
      </Box>
    </Toolbar>
  );
}
export default ResponsiveAppBar;
