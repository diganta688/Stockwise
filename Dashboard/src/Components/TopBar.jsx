import React, { useEffect, useState } from "react";
import Menuu from "./Menu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function TopBar() {
  const [sensexAndNifty, setSensexAndNifty] = useState([
    { name: "^BSESN", regularMarketPrice: 0, percent: "0%", change: "0.00" },
    { name: "^NSEI", regularMarketPrice: 0, percent: "0%", change: "0.00" },
  ]);

  const update = async () => {
    try {
      let res = await axios.post(
        "https://full-stack-stock-monitoring-tool-backend-fjip.onrender.com/update-stock-wishlist",
        {
          names: ["^BSESN", "^NSEI"],
        }
      );

      const { data } = res.data;

      const updatedWishlist = sensexAndNifty.map((item) => {
        const stockData = data.find((stock) => stock.symbol === item.name);
        if (stockData) {
          const percentage =
            ((stockData.regularMarketPrice -
              stockData.regularMarketPreviousClose) /
              stockData.regularMarketPreviousClose) *
            100;
          const finalResult = percentage.toFixed(2);
          const change = (
            stockData.regularMarketPrice - stockData.regularMarketPreviousClose
          ).toFixed(2);

          return {
            ...item,
            regularMarketPrice: stockData.regularMarketPrice,
            percent: finalResult + "%",
            change: change,
          };
        }
        return item;
      });

      setSensexAndNifty(updatedWishlist);
    } catch (err) {
      toast.error(err, { position: "top-right", autoclose: 2000 });
    }
  };

  const isMarketOpen = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    const marketOpenTime = 9 * 60 + 15;
    const marketCloseTime = 15 * 60 + 30;

    return currentTime >= marketOpenTime && currentTime <= marketCloseTime;
  };

  useEffect(() => {
    update();

    if (isMarketOpen()) {
      const interval = setInterval(update, 2000);
      return () => clearInterval(interval);
    }
  }, []);

  const nifty50 = sensexAndNifty.find((item) => item.name === "^NSEI") || {};
  const sensex = sensexAndNifty.find((item) => item.name === "^BSESN") || {};

  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-4">
          <div className="row nifty-div" style={{ height: "100%" }}>
            <div className="col">
              <span>NIFTY50</span>
              <span
                className={nifty50.percent.includes("-") ? "loss" : "profit"}
                style={{ paddingLeft: "0" }}
              >
                {nifty50.regularMarketPrice}
              </span>
              <span
                className={nifty50.percent.includes("-") ? "loss" : "profit"}
                style={{ paddingLeft: "0" }}
              >
                ({nifty50.percent})
              </span>
            </div>
            <div className="col">
              <span>SENSEX</span>
              <span
                className={
                  sensex.percent.includes("-") ? "loss name" : "profit name"
                }
                style={{ paddingLeft: "0" }}
              >
                {sensex.regularMarketPrice}
              </span>
              <span
                className={
                  sensex.percent.includes("-") ? "loss name" : "profit name"
                }
                style={{ paddingLeft: "0" }}
              >
                ({sensex.percent})
              </span>
            </div>
          </div>
        </div>
        <Menuu />
      </div>
    </div>
  );
}

export default TopBar;
