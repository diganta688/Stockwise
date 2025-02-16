import React, { useContext, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from '@mui/material/CircularProgress';
import WarningIcon from "@mui/icons-material/Warning";
import axios from "axios";
import { useCookies } from "react-cookie";

function Menuu() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { uId } = useContext(uidContext);
  const [userr, setUserr] = useState({});
  const [userAvater, setUserAvater] = useState();

  const toto = () => {
    toast.info("You don't have any notification", {
      position: "top-right",
      autoclose: 2000,
    });
  };
  const handleOpenUserMenu = async (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
        withCredentials: true
      }); 
      window.open(`${import.meta.env.VITE_API_URL_FRONTEND}/signup`, "_blank");
      window.close();
    } catch (e) {
      setLoading(false);
      toast.error(e.message, { position: "top-right", autoClose: 2000 });
    }
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const avaterFind = async()=>{
    setUsernameLoading(true)
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
      setUserAvater(user.name.charAt(0));
      setUsernameLoading(false)
    } catch (error) {
      setUsernameLoading(false)
      toast.error("something went wrong", {
        position: "top-right",
        autoclose: 2000,
      });
    }
  }
  useEffect(()=>{
    avaterFind();
  },[]);
  return (
    <>
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
            <NotificationsOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={toto}
            />
          </div>
          <div className="" style={{ paddingRight: "1rem" }}>
            <div className="">
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                    >{userAvater}</Avatar>
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
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "1rem",
                        }}
                      >{userAvater}</Avatar>
                      {usernameLoading ? <CircularProgress size="15px" /> : userr.username}
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    key={1}
                    onClick={() => {
                      setIsAlertOpen(true);
                      setAnchorElUser(null);
                    }}
                  >
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
      <div
        className={`modal fade ${isAlertOpen ? "show d-block" : ""}`}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <WarningIcon className="text-danger me-2" />
                Confirm Logout
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsAlertOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to log out? You will need to log in again.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsAlertOpen(false)}
              >
                Cancel
              </button>
              {
                loading? <button type="button" className="btn btn-danger" disabled>
                Loading...
              </button> : <button type="button" className="btn btn-danger" onClick={logout}>
                Confirm
              </button>
              }
            </div>
          </div>
        </div>
      </div>
      {isAlertOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
}

export default Menuu;
