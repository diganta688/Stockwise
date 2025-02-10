import React, { useContext, useEffect,useState } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { uidContext } from "../Content/context";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Menuu() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { uId } = useContext(uidContext);
    const [userr, setUserr] = useState({});
  
  
  const toto =()=>{
    toast.info("You don't have any notification", { position: "top-right" , autoclose: 2000});
  }
  const handleOpenUserMenu = async(event) => {    
    setAnchorElUser(event.currentTarget);
    try {
      let userRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/find`,
        {
          uId: uId,
        },
        { withCredentials: true }
      );
      const { user } = userRes.data;      
      setUserr(user);
    } catch (error) {
      toast.error("something went wrong", { position: "top-right" , autoclose: 2000})
    }

  };

  const logout = async () => {
    try {
      setAnchorElUser(null);
      let res = await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        window.open(`${import.meta.env.VITE_API_URL_FRONTEND}/signup`, "_blank");
        window.close();
      }
    } catch (e) {
      toast.error(e, { position: "top-right" , autoclose: 2000});
    }
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const user = async()=>{
    
  }
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
          <NotificationsOutlinedIcon style={{cursor: "pointer"}} onClick={toto} />
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
                    {userr.username}
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
