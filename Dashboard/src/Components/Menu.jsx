import React, { useContext } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { uidContext } from "../Content/context";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Menuu() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ["Profile", "Setting", "Logout"];
  const { uId } = useContext(uidContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logout = async () => {
    try {
      setAnchorElUser(null);
      let res = await axios.post(
        "https://full-stack-stock-monitoring-tool-9qmj.onrender.com/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        window.open("full-stack-stock-monitoring-tool-frontend.vercel.app/signup", "_blank");
        window.close();
      }
    } catch (e) {
            toast.error(e, { position: "top-right" , autoclose: 2000});
    }
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div className="col-8 menu-main">
      
      <div className="logo">
        <img
          src="\media\Images\kiteOriginal.png"
          alt=""
          style={{ width: "5%", minWidth: "40px" }}
        />
      </div>
      <div className="menu">
        <ul>
          <li>
            <NavLink
              to={`/dashboard/${uId}/summery`}
              className={(e) => (e.isActive ? "text-warning" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/${uId}/allStock`}
              className={(e) => (e.isActive ? "text-warning" : "")}
            >
              All&nbsp;Stocks
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/${uId}/orders`}
              className={(e) => (e.isActive ? "text-warning" : "")}
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/${uId}/holdings`}
              className={(e) => (e.isActive ? "text-warning" : "")}
            >
              Holdings
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/${uId}/funds`}
              className={(e) => (e.isActive ? "text-warning" : "")}
            >
              Funds
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="prifile-main">
        <div className="mt-2 notification">
          <NotificationsOutlinedIcon />
        </div>
        <div className="" style={{ paddingRight: "1rem" }}>
          <div className="">
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="\media\Images\meFounder.jpg" />
                </IconButton>
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
                <MenuItem key={2} onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="\media\Images\meFounder.jpg"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "1rem",
                      }}
                    />
                    Diganta
                  </Typography>
                </MenuItem>
                <MenuItem key={0} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <SettingsIcon style={{ marginRight: "1rem" }} />
                    Settings
                  </Typography>
                </MenuItem>
                <MenuItem key={1} onClick={logout}>
                  <Typography sx={{ textAlign: "center" }}>
                    <LogoutRoundedIcon style={{ marginRight: "1rem" }} />
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menuu;
