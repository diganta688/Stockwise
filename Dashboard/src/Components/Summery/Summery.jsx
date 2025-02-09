import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Chart } from "./Chart";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Summery() {
  let { id } = useParams();
  const [allHoldings, setAllHoldings] = useState([]);
  const [totalCurrValue, setTotalCurrValue] = useState(0);
  const [userr, setUserr] = useState({});
  const [allWishlist, setAllWishlist] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const holdingsRes = await axios.get(
          `https://full-stack-stock-monitoring-tool-d7k4.onrender.com/allHoldings/${id}`
        );
        const holdings = holdingsRes.data.holdings;
        setAllHoldings(holdings);

        const currValue = holdings.reduce(
          (acc, stock) => acc + stock.currPrice * stock.qty,
          0
        );
        setTotalCurrValue(currValue);
        const userRes = await axios.post(
          "https://full-stack-stock-monitoring-tool-d7k4.onrender.com/user/find",
          {
            uId: id,
          },
          { withCredentials: true }
        );
        const { user } = userRes.data;
        setUserr(user);
      } catch (error) {
        toast.error(error, { position: "top-right" , autoclose: 2000}); 
      }
    };
    axios.get(`https://full-stack-stock-monitoring-tool-d7k4.onrender.com/allwishlist/${id}`).then((res) => {
      setAllWishlist(res.data.wishlists);
    });
    fetchData();
  }, [id]);
  const data = {
    labels: allWishlist.map((a) => a["name"]),
    datasets: [
      {
        label: "Wishlists",
        data: allWishlist.map((a) => a.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="row p-4">
        <div className="row">
          <p className="fs-3 p-0 border-bottom pb-2">Hi,{userr.username}</p>
        </div>
        <div className="row mt-5">
          <p className="fs-5 p-0 pb-5">Equity</p>
        </div>
        <div className="row p-0 border-bottom">
          <div className="col ">
            <p style={{ fontSize: "50px" }}>3.74k</p>
          </div>
          <div className="col">
            <p>Margin used 0</p>
          </div>
        </div>
        <div className="row mt-5">
          <p className="fs-5 p-0 pb-5 ">Holdings({allHoldings.length})</p>
        </div>
        <div className="row">
          <div className="col">
            <p style={{ fontSize: "50px" }} className="text-success">
              {totalCurrValue.toFixed(2)}
            </p>
          </div>
          <div className="col">
            <p>Current value</p>
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className=""
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          WishList
        </div>
        <div className="" style={{ width: "70%" }}>
          <Chart data={data} />
        </div>
      </div>
    </>
  );
}

export default Summery;
