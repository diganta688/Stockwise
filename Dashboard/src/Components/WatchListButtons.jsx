import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import StockAnalyse from "./StockAnalyse";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Grow } from "@mui/material";
import BuySellDial from "./BuySellDial";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const WatchListButtons = ({ uid, refreshWatchlist }) => {
  const [open, setOpen] = useState(false);
  const [AnalyseOpen, setAnalyseOpen] = useState(false);
  let { id } = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const trueFalse = ()=>{
    setAnalyseOpen(true);
    toast.warn("Currently working on it ", { position: "top-right", autoclose: 2000 })
  }
  const deleteFromWishlist = async () => {
    toast.success("successfully removed", { position: "top-right", autoclose: 2000 });
    refreshWatchlist();
    await axios.post(`https://full-stack-stock-monitoring-tool-backend-fjip.onrender.com/delete-from-wishlist/${id}`, {
      data: uid._id,
    });
    
  };
  return (
    <span className="actions">
      {open && <BuySellDial isOpen={open} setIsopen={setOpen} uid={uid._id} />}
      {AnalyseOpen && <StockAnalyse stockInfo={uid}/>}
      <Tooltip title="Buy" arrow placement="top" TransitionComponent={Grow}>
        <Button
          type="button"
          class="btn btn-WachList btn-primary"
          onClick={handleClickOpen}
        >
          <ShoppingCartOutlinedIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Sell" arrow placement="top" TransitionComponent={Grow}>
        <Button size="small" class="btn btn-WachList btn-danger">
          <SellOutlinedIcon />
        </Button>
      </Tooltip>
      <Tooltip
        title="Analytics"
        arrow
        placement="top"
        TransitionComponent={Grow}
      >
        <Button size="small" class="btn btn-WachList btn-info" >
          <LeaderboardOutlinedIcon onClick={trueFalse}/>
        </Button>
      </Tooltip>
      <Tooltip title="Delete" arrow placement="top" TransitionComponent={Grow}>
        <Button size="small" class="btn btn-WachList btn-danger">
          <DeleteForeverOutlinedIcon onClick={deleteFromWishlist} />
        </Button>
      </Tooltip>
    </span>
  );
};

export default WatchListButtons;
