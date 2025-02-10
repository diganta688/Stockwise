import React from "react";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { Grow } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HoldingCount({ allHoldings, totalInvestment, totalCurrValue }) {
  let {id} = useParams();
  const [open, setOpen] = React.useState(false);
  const [selectedStock, setSelectedStock] = React.useState(null);
  const [sellQty, setSellQty] = React.useState(0);
  const [calculatedPrice, setCalculatedPrice] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
    setSelectedStock(null);
    setSellQty(0);
    setCalculatedPrice(0);
  };

  const handleSellClick = (stock) => {
    setSelectedStock(stock);
    setSellQty(stock.qty);
    setCalculatedPrice(stock.currPrice * stock.qty);
    setOpen(true);
  };

  const handleQtyChange = (e) => {
    const newQty = Math.min(selectedStock.qty, Math.max(0, e.target.value));
    setSellQty(newQty);
    setCalculatedPrice(newQty * selectedStock.currPrice);
  };

  const sell = async () => {
   if(sellQty>0){
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/sell-stock`, {
          stockId: selectedStock._id,
          userId: id,
          sellQty: sellQty,
          price: calculatedPrice
      },{ withCredentials: true });
      toast.success(response.data.message,  { position: "top-right" , autoclose: 2000})
      handleClose();
    } catch (error) {
      toast.error("Sell failed",  { position: "top-right" , autoclose: 2000})
  }
   }
};

  return (
    <>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price(Buy)</th>
              <th>Curr val</th>
              <th>Net chg.</th>
              <th>SELL</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, idx) => {
              return (
                <tr key={idx} className="text-muted">
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.priceBuy.toFixed(2)}</td>
                  <td>{(stock.currPrice * stock.qty).toFixed(2)}</td>
                  <td className={stock.net < 0 ? "loss" : "profit"}>
                    {stock.net.toFixed(2)}%{" "}
                  </td>
                  <td>
                    <Tooltip
                      title={"Sell " + stock.name}
                      arrow
                      placement="top"
                      TransitionComponent={Grow}
                    >
                      <Button
                        size="small"
                        className="btn btn-WachList btn-danger"
                        onClick={() => handleSellClick(stock)}
                      >
                        <SellOutlinedIcon />
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className="row px-5"
        style={{ display: "flex", height: "12%", marginBottom: "1rem" }}
      >
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{totalCurrValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>{(totalCurrValue - totalInvestment).toFixed(2)}</h5>
          <p>P&L</p>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {selectedStock && (
          <>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TextField
                  fullWidth
                  label="Quantity to Sell"
                  type="number"
                  value={sellQty}
                  onChange={handleQtyChange}
                  inputProps={{
                    min: 0,
                    max: selectedStock.qty,
                    step: 1,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <div style={{ marginTop: "1rem" }}>
                  <strong>Estimated Value:</strong>₹{calculatedPrice.toFixed(2)}
                  <br />
                  <small>
                    (Current Price: ₹{selectedStock.currPrice.toFixed(2)})
                  </small>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={sell} autoFocus>
                Confirm Sell
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

export default HoldingCount;
