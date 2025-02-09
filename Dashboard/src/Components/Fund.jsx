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
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Funds = () => {
  const [amount, setAmount] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [addFundOpen, setAddFundOpen] = useState(false);
  let { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(
        `https://full-stack-stock-monitoring-tool-9qmj.onrender.com/transaction-history/${id}`
      );
      const sortedTransactions = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      toast.error("Error fetching transaction history", {
        position: "top-right",
        autoclose: 2000,
      });
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);


  const handleWithdraw = async () => {
    if (
      !amount ||
      isNaN(amount) ||
      Number(amount) <= 0 ||
      amount > walletBalance
    ) {
      toast.error("Please enter a valid amount!", {
        position: "top-right",
        autoclose: 2000,
      });
      return;
    }

    try {
      const response = await axios.post(
        `https://full-stack-stock-monitoring-tool-9qmj.onrender.com/withdraw-funds/${id}`,
        {
          amount: Number(amount),
        }
      );

      if (response.data.status === "ok") {
        toast.success(
          `Withdrawal successful! New Balance: ₹${response.data.newBalance}`,
          { position: "top-right", autoclose: 2000 }
        );
        setWithdrawOpen(false);
        setAmount("");
        fetchWalletBalance();
        fetchTransactionHistory();
      }
      await fetchTransactionHistory();
      setCurrentPage(1);
    } catch (error) {
      toast.error("Withdrawal failed", {
        position: "top-right",
        autoclose: 2000,
      });
    }

  };
  

  useEffect(() => {
    fetchWalletBalance();
    fetchTransactionHistory();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const response = await axios.get(
        `https://full-stack-stock-monitoring-tool-9qmj.onrender.com/wallet-balance/${id}`
      );
      setWalletBalance(response.data.balance);
    } catch (error) {
      toast.error("Error fetching wallet balance:", {
        position: "top-right",
        autoclose: 2000,
      });
    }
  };

  const handlePayment = async () => {
    if (!amount || amount < 100 || amount > 10000) {
      toast.error("Please enter a valid amount!", {
        position: "top-right",
        autoclose: 2000,
      });
      return;
    }

    try {
      const orderResponse = await axios.post(
        "https://full-stack-stock-monitoring-tool-9qmj.onrender.com/create-order",
        {
          amount: amount * 100,
          currency: "INR",
          receipt: `receipt_${id}`,
          notes: { userId: id },
        }
      );

      const order = orderResponse.data;

      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        toast.error("Razorpay SDK failed to load. Are you online?", {
          position: "top-right",
          autoclose: 2000,
        });
        return;
      }

      if (typeof window.Razorpay === "undefined") {
        toast.error("Razorpay SDK not loaded. Please refresh and try again.", {
          position: "top-right",
          autoclose: 2000,
        });
        return;
      }

      const options = {
        key: "rzp_test_HmPIoX9smDWmp5",
        amount: order.amount,
        currency: order.currency,
        name: "Diganta",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verificationResponse = await axios.post(
              `https://full-stack-stock-monitoring-tool-9qmj.onrender.com/verify-payment/${id}`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verificationResponse.data.status === "ok") {
              toast.success("Payment Successful!", {
                position: "top-right",
                autoclose: 2000,
              });
              setAddFundOpen(false);
              fetchWalletBalance();
              fetchTransactionHistory();
            } else {
              toast.error("Payment verification failed", {
                position: "top-right",
                autoclose: 2000,
              });
            }
          } catch (error) {
            toast.error("Error verifying payment", {
              position: "top-right",
              autoclose: 2000,
            });
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Error processing payment", {
        position: "top-right",
        autoclose: 2000,
      });
    }
  };

  return (
    <div className="container mt-4">
           <div className="card">
        <h3>Wallet Balance: ₹{walletBalance.toFixed(2)}</h3>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <p className="funds-add">Instant, zero fund transfers with UPI</p>
        <button
          className="btn btn-success me-2"
          onClick={() => {
            setAddFundOpen(true);
          }}
        >
          Add Funds
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setWithdrawOpen(true);
          }}
        >
          Withdraw
        </button>
      </div>

      <React.Fragment>
        <Dialog
          open={addFundOpen}
          onClose={() => {
            setAddFundOpen(false);
          }}
        >
          <DialogTitle>Add Funds in your wallet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the Ammount (min 100INR | One time max 10000INR)
            </DialogContentText>
            <TextField
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              required
              margin="dense"
              id="name"
              name="number"
              label="Ammount"
              type="number"
              fullWidth
              variant="standard"
              value={amount}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setAddFundOpen(false);
                setAmount("");
              }}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handlePayment}>
              Pay now
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <React.Fragment>
        <Dialog
          open={withdrawOpen}
          onClose={() => {
            setWithdrawOpen(false);
          }}
        >
          <DialogTitle>Withdraw</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the withdraw amount</DialogContentText>
            <TextField
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              required
              margin="dense"
              id="name"
              name="number"
              label="Ammount"
              type="number"
              fullWidth
              variant="standard"
              value={amount}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setWithdrawOpen(false);
                setAmount("");
              }}
            >
              Cancel
            </Button>

            <Button type="submit" onClick={handleWithdraw}>
              Withdraw
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <div className="transaction-history mt-4">
        <h3>Transaction History</h3>
        <table className="table">
          <thead>
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
              currentTransactions.map((txn, index) => (
                <tr key={index}>
                  <td>{new Date(txn.date).toLocaleString()}</td>
                  <td
                    style={{ 
                      color: (txn.type === "deposit" || txn.type === "SELLStock") 
                        ? "green" 
                        : "red" 
                    }}
                  >
                    {txn.type === "deposit"
                      ? "Deposit"
                      : txn.type === "withdraw"
                      ? "Withdraw"
                      : txn.type === "BUY Stock" 
                      ? "BUY Stock" 
                      : "SELL Stock"}
                  </td>
                  <td>₹{txn.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {/* Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || transactions.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Funds;