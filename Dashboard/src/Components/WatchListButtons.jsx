import React, { useState, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import StockAnalyse from "./StockAnalyse";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Grow } from "@mui/material";
import BuySellDial from "./BuySellDial";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { counterUpdate } from "../Content/context";

const WatchListButtons = ({ uid, setIsMouseEnter}) => {
  const value = useContext(counterUpdate);
  const [open, setOpen] = useState(false);
  const [AnalyseOpen, setAnalyseOpen] = useState(false);
  let { id } = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const trueFalse = ()=>{
    setAnalyseOpen(true);
  }
  const deleteFromWishlist = async () => {
    toast.success("successfully removed", { position: "top-right", autoclose: 2000 });
    value.setWatchlistUpdated(prev=>!prev);
    await axios.post(`${import.meta.env.VITE_API_URL}/delete-from-wishlist/${id}`, {
      data: uid._id,
    });
    
  };
  return (
    <span className="actions">
      {open && <BuySellDial isOpen={open} setIsopen={setOpen} uid={uid._id} />}
      {AnalyseOpen && <StockAnalyse stockInfo={uid} setIsMouseEnter={setIsMouseEnter}/>}
      <Tooltip title="Buy" arrow placement="top" TransitionComponent={Grow}>
        <Button
          type="button"
          class="btn btn-WachList btn-primary"
          onClick={handleClickOpen}
        >
          <ShoppingCartOutlinedIcon />
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
