import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const Funds = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [addFundOpen, setAddFundOpen] = useState(false);
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/transaction-history/${id}`
      );
      setTransactions(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      toast.error("Error fetching transaction history");
    }
  };

  const fetchWalletBalance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/wallet-balance/${id}`
      );
      setWalletBalance(response.data.balance);
    } catch (error) {
      toast.error("Error fetching wallet balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
    fetchTransactionHistory();
  }, []);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleWithdraw = async () => {
    if (!amount || isNaN(amount) || amount <= 0 || amount > walletBalance) {
      toast.error("Please enter a valid amount!");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/withdraw-funds/${id}`,
        { amount: Number(amount) }
      );
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
    if (!amount || amount < 100 || amount > 10000) {
      toast.error("Please enter a valid amount!");
      return;
    }

    try {
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-order`,
        { amount: amount , currency: "INR", receipt: `receipt_${id}`, notes: { userId: id } }
      );

      const order = orderResponse.data;
      const options = {
        key: "rzp_test_HmPIoX9smDWmp5",
        amount: order.amount,
        currency: order.currency,
        name: "Diganta",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          const verification = await axios.post(
            `${import.meta.env.VITE_API_URL}/verify-payment/${id}`,
            response
          );
          if (verification.data.status === "ok") {
            toast.success("Payment Successful!");
            setAddFundOpen(false);
            fetchWalletBalance();
            fetchTransactionHistory();
          } else toast.error("Payment verification failed");
        },
      };
      new window.Razorpay(options).open();
    } catch {
      toast.error("Error processing payment");
    }
  };

  return (
    <div className="container-fluid p-3">
      <div className="card p-3 mb-3">
        <h3>
          Wallet Balance:
          {loading ? <CircularProgress size="20px" /> : `₹${walletBalance.toFixed(2)}`}
        </h3>
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <p className="mb-2">Instant, zero fund transfers with UPI</p>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={() => setAddFundOpen(true)}>Add Funds</button>
          <button className="btn btn-primary" onClick={() => setWithdrawOpen(true)}>Withdraw</button>
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
    <tr><td colSpan="3">No transactions found</td></tr>
  ) : (
    currentTransactions.map((txn, index) => {
      const isGreen = txn.type.includes("deposit") || txn.type.includes("SELLStock");
      const isRed = txn.type.includes("withdraw") || txn.type.includes("BUY Stock");

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
            onClick={() => setCurrentPage(currentPage - 1)}
          >Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages || transactions.length === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >Next</button>
        </div>
      </div>
      <Dialog open={addFundOpen} onClose={() => setAddFundOpen(false)}>
        <DialogTitle>Add Funds</DialogTitle>
        <DialogContent>
          <DialogContentText>Min ₹100, Max ₹10000</DialogContentText>
          <TextField
            fullWidth variant="standard" label="Amount" type="number"
            value={amount} onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddFundOpen(false)}>Cancel</Button>
          <Button onClick={handlePayment}>Pay Now</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={withdrawOpen} onClose={() => setWithdrawOpen(false)}>
        <DialogTitle>Withdraw Funds</DialogTitle>
        <DialogContent>
          <TextField fullWidth variant="standard" label="Amount" type="number"
            value={amount} onChange={(e) => setAmount(e.target.value)}
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
