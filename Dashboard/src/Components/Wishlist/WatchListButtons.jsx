import React, { useState, useContext, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import StockAnalyse from "./StockAnalyse";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import BuySellDial from "./BuySellDial";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { counterUpdate } from "../../Content/context";

const WatchListButtons = ({ uid, setIsMouseEnter, display = true , setStockInfo }) => {
  const value = useContext(counterUpdate);
  const [open, setOpen] = useState(false);
  const [AnalyseOpen, setAnalyseOpen] = useState(false);
  let { id } = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const trueFalse = () => {
   if(display){
    setAnalyseOpen(true);
   }
   else{
    setTimeout(() => {
      setStockInfo(uid)
    }, 1000);
   }
  };
  const deleteFromWishlist = async () => {
    toast.success("successfully removed", {
      position: "top-right",
      autoclose: 2000,
    });
    value.setWatchlistUpdated((prev) => !prev);
    await axios.post(
      `${import.meta.env.VITE_API_URL}/delete-from-wishlist/${id}`,
      {
        data: uid._id,
      }
    );
  };
  return (
    <div className="wishlist-actions">
      {open && <BuySellDial isOpen={open} setIsopen={setOpen} uid={uid._id} />}
      {AnalyseOpen && (
        <StockAnalyse stockInfo={uid} setIsMouseEnter={setIsMouseEnter} />
      )}

      <Tooltip title="Buy" arrow placement="top">
        <Button className="action-btn buy" onClick={handleClickOpen}>
          <ShoppingCartOutlinedIcon />
        </Button>
      </Tooltip>
        <Tooltip title="Analytics" arrow placement="top">
          <Button className="action-btn analytics" onClick={trueFalse}>
            <LeaderboardOutlinedIcon />
          </Button>
        </Tooltip>

      <Tooltip title="Delete" arrow placement="top">
        <Button className="action-btn delete" onClick={deleteFromWishlist}>
          <DeleteForeverOutlinedIcon />
        </Button>
      </Tooltip>
    </div>
  );
};

export default WatchListButtons;
