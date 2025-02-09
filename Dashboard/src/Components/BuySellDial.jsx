import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import { counterContext } from "../Content/context";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function BuySellDial({ isOpen, setIsopen, uid }) {
  let { id } = useParams();
  const [btnDisabled, setBtnDesabled] = useState(false);
  const [stock, setStock] = useState({});
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(stock.price);
  const [exPrice, setExpPrice] = useState(stock.price);
  const [isPlacedOrder, setIsPlacedOrder] = useState(false);
  const mouse = useContext(counterContext);
    const [walletBalance, setWalletBalance] = useState(0);
  const [balence, setBalence] = useState("");
 
  let fetchData = async () => {
    try {
      let res = await axios.post(
        `https://full-stack-stock-monitoring-tool-d7k4.onrender.com/fetch-order-details/${uid}`
      );
      setStock(res.data.message);
    } catch (error) {
      console.log(error);
            toast.error(error, { position: "top-right" , autoclose: 2000});
      
    }
  };

  useEffect(() => {
    if (uid) {
      fetchData();
    }
  }, [uid]);

  useEffect(() => {
    if (stock.price) {
      setPrice(stock.price);
      setExpPrice(stock.price * qty);
    }
  }, [stock]);

  const handleClose = () => {
    setIsopen(false);
    mouse.setIsMouseEnter(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://full-stack-stock-monitoring-tool-d7k4.onrender.com/wallet-balance/${id}`
      );
      setWalletBalance(response.data.balance);
      if(walletBalance>=price){
        toast.success("Stock buy Successfull", { position: "top-right" , autoclose: 2000});
        setIsPlacedOrder(true);
        setTimeout(async () => {
          setIsPlacedOrder(false);
          setIsopen(false);
          mouse.setIsMouseEnter(false);
          await axios.post(`https://full-stack-stock-monitoring-tool-d7k4.onrender.com/addOrder/${id}/${uid}`, {
            price: price,
            qty: qty,
            mode: "BUY",
          });
        }, 4000);
        await axios.post(
          `https://full-stack-stock-monitoring-tool-d7k4.onrender.com/buy-stock-balence/${id}`,
          {
            amount: Number(price),
          }
        );
      }else{
        setBalence("Dont have enough balence");
      }
    } catch (error) {
      toast.error(error, { position: "top-right" , autoclose: 2000});
    }
    
  };

  const handleQtyChange = (e) => {
    let newQty = e.target.value;
    setQty(newQty);
    setExpPrice(stock.price * newQty);
    setPrice(stock.price * newQty);
    if (price < stock.price || qty < 1) {
      setBtnDesabled(true);
    } else {
      setBtnDesabled(false);
    }
  };

  const handlePriceChange = (e) => {
    setBalence("");
    let newQty = e.target.value;
    setPrice(e.target.value);
    setExpPrice(newQty);
    if (e.target.value < stock.price || qty < 1) {
      setBtnDesabled(true);
    } else {
      setBtnDesabled(false);
    }
  };

  return (
    <>
      <React.Fragment>
        <Dialog
          open={isOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="container">
            <div className="row p-3 pb-0">
              <p>{uid.name}</p>
            </div>
            <div className="row p-3">
              <div className="col">
                <TextField
                  inputProps={{ min: 1 }}
                  id="outlined-number"
                  label="Qty"
                  type="number"
                  value={qty}
                  onChange={handleQtyChange}
                />
              </div>
              <div className="col">
                <TextField
                  inputProps={{ min: stock.price }}
                  id="outlined-number"
                  label="Number"
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </div>
            </div>
            {balence && <p style={{color:"red", fontSize: "12px"}}>{balence}</p>}
            {isPlacedOrder && (
              <>
                <CircularProgress
                  style={{ position: "absolute", margin: "0 45%" }}
                />
              </>
            )}
            <div className="buy-sell-dialouge mb-3">
              <div className="mt-4">
                <p>
                  Margin required: &nbsp;
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {exPrice}
                </p>
              </div>
              <div className="mt-4">
                {btnDisabled ? (
                  <button
                    type="button"
                    className="btn btn-primary mx-2"
                    disabled
                  >
                    <LocalMallIcon />
                    Buy
                  </button>
                ) : (
                  <button
                    type="button"
                    class="btn btn-primary mx-2"
                    onClick={handleSubmit}
                  >
                    <LocalMallIcon />
                    Buy
                  </button>
                )}

                {btnDisabled ? (
                  <button type="button" class="btn btn-secondary" disabled>
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default BuySellDial;
