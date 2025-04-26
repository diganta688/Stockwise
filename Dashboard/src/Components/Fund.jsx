import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Funds = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [addFundOpen, setAddFundOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const fetchWalletBalance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/payment/wallet-balance/${id}`);
      setWalletBalance(response.data.balance);
    } catch (error) {
      toast.error("Error fetching wallet balance");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/payment/transaction-history/${id}`);
      const sortedTransactions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sortedTransactions);
    } catch (error) {
      toast.error("Error fetching transaction history");
    }
  };

  useEffect(() => {
    fetchWalletBalance();
    fetchTransactionHistory();
  }, []);

  const indexOfLast = currentPage * transactionsPerPage;
  const indexOfFirst = indexOfLast - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleWithdraw = async () => {
    const amt = Number(amount);
    if (!amt || isNaN(amt) || amt <= 0 || amt > walletBalance) {
      toast.error("Please enter a valid amount!");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/payment/withdraw-funds/${id}`, {
        amount: amt,
      });
      if (response.data.status === "ok") {
        toast.success(`Withdrawal successful! New Balance: ₹${response.data.newBalance}`);
        setWithdrawOpen(false);
        setAmount("");
        fetchWalletBalance();
        fetchTransactionHistory();
      }
    } catch {
      toast.error("Withdrawal failed");
    }
  };

  const handlePayment = async () => {
    const amt = Number(amount);
    if (!amt || amt < 100 || amt > 10000) {
      toast.error("Please enter an amount between ₹100 and ₹10,000");
      return;
    }

    try {
      const orderResponse = await axios.post(`${import.meta.env.VITE_API_URL}/payment/create-order`, {
        amount: Math.round(amt * 100),
        currency: "INR",
        receipt: `receipt_${id}`,
        notes: { userId: id },
      });

      const order = orderResponse.data;
      const options = {
        key: import.meta.env.VITE_RAZOR_PAY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Keshab",
        description: "Wallet Top-Up",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verify = await axios.post(`${import.meta.env.VITE_API_URL}/payment/verify-payment/${id}`, response);
            if (verify.data.status === "ok") {
              toast.success("Payment Successful!");
              setAddFundOpen(false);
              setAmount("");
              fetchWalletBalance();
              fetchTransactionHistory();
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Error verifying payment");
          }
        },
        modal: {
          ondismiss: () => toast.info("Payment cancelled by user"),
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      
      toast.error("Payment failed");
    }
  };

  return (
    <div className="container-fluid p-3">
      <div className="card p-3 mb-3">
        <h3>
          Wallet Balance:{" "}
          {loading ? <CircularProgress size="20px" /> : `₹${walletBalance.toFixed(2)}`}
        </h3>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <p className="mb-2">Instant, zero-fee fund transfers with UPI</p>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={() => {
            setAddFundOpen(true);
            setAmount("");
          }}>
            Add Funds
          </button>
          <button className="btn btn-primary" onClick={() => {
            setWithdrawOpen(true);
            setAmount("");
          }}>
            Withdraw
          </button>
        </div>
      </div>

      <div className="transaction-history">
        <h3>Transaction History</h3>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length === 0 ? (
                <tr>
                  <td colSpan="3">No transactions found</td>
                </tr>
              ) : (
                currentTransactions.map((txn, index) => {
                  const isGreen = txn.type.includes("deposit") || txn.type.includes("SELLStock");
                  const isRed = txn.type.includes("withdraw") || txn.type.includes("BUYStock");

                  return (
                    <tr key={index}>
                      <td>{new Date(txn.date).toLocaleString()}</td>
                      <td style={{ color: isGreen ? "green" : isRed ? "red" : "black" }}>
                        {txn.type
                          .replace("deposit", "Deposit")
                          .replace("withdraw", "Withdraw")
                          .replace("SELLStock", "Sell Stock")
                          .replace("BUYStock", "Buy Stock")}
                      </td>
                      <td>₹{txn.amount}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages || transactions.length === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Funds Dialog */}
      <Dialog open={addFundOpen} onClose={() => setAddFundOpen(false)}>
        <DialogTitle>Add Funds</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter an amount between ₹100 and ₹10,000</DialogContentText>
          <TextField
            fullWidth
            variant="standard"
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddFundOpen(false)}>Cancel</Button>
          <Button onClick={handlePayment}>Pay Now</Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawOpen} onClose={() => setWithdrawOpen(false)}>
        <DialogTitle>Withdraw Funds</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="standard"
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWithdrawOpen(false)}>Cancel</Button>
          <Button onClick={handleWithdraw}>Withdraw</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Funds;
