import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

function Order() {
  let { id } = useParams();
  const [allOrders, setallOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`https://full-stack-stock-monitoring-tool-d7k4.onrender.com/allOrders/${id}`)
      .then((res) => {
        if (res.data.success) {
          const orders = res.data.orders;
          orders.forEach((order) => {
            const orderDate = new Date(order.date);
            const currentDate = new Date();
            const timeDiff = currentDate - orderDate;
            if (timeDiff >= 24 * 60 * 60 * 1000) {
              axios
                .delete(`https://full-stack-stock-monitoring-tool-d7k4.onrender.com/delete-order/${order._id}`)
                .then(() => {
                  console.log(`Order ${order._id} deleted.`);
                  setallOrders((prevOrders) =>
                    prevOrders.filter((o) => o._id !== order._id)
                  );
                })
                .catch((error) => {
                  toast.error(error, { position: "top-right" , autoclose: 2000});        
                });
            }
          });
          setallOrders(orders);
        }
      })
      .catch((error) => {
        toast.error(error, { position: "top-right" , autoclose: 2000});        
        
      });
  }, []);

  return (
    <>

      {allOrders.length === 0 ? (
        <div className="text-center order">
          <MenuBookIcon fontSize="large" />
          <p className="fs-5 text-muted p-3">
            You haven’t placed any orders today
          </p>
        </div>
      ) : (
        <>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <p>THe order will be romove from your order after 24 hr of adding in holdings</p>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Mode</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((stock, idx) => (
                  <tr key={idx} className="text-muted">
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{stock.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default Order;
