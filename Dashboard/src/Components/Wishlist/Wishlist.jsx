import React, { useEffect, useState, useContext } from "react";
import WatchListItems from "./WatchListItems";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { counterUpdate } from "../../Content/context";

function Wishlist() {
  let value = useContext(counterUpdate);
  let { id } = useParams();
  const [allWishlist, setAllWishlist] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/allwishlist/${id}`, {
        withCredentials: true
      });
      setAllWishlist(res.data.wishlists);
    } catch (error) {
      toast.error(error, { position: "top-right", autoclose: 2000 });
    }
  };

  const update = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/update-wishlist`,
        {
          userId: id,
          data: allWishlist,
        },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };
  const updateStockData = async () => {
    if (allWishlist.length > 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/update-stock-wishlist`,
          { names: allWishlist.map((item) => item.name) },
          { withCredentials: true }
        );

        if (response.status === 200) {
          const { data } = response.data;
          const updatedWishlist = allWishlist.map((item) => {
            const stockData = data.find((stock) => stock.symbol === item.name);
            if (stockData) {
              const percentage =
                ((stockData.regularMarketPrice -
                  stockData.regularMarketPreviousClose) /
                  stockData.regularMarketPreviousClose) *
                100;
              const percentageStr = percentage.toString();
              const [integer, decimal] = percentageStr.split(".");
              const finalResult = parseFloat(
                integer + (decimal ? `.${decimal.replace(/^0+/, "")}` : "")
              ).toFixed(2);
              const change = (
                stockData.regularMarketPrice -
                stockData.regularMarketPreviousClose
              ).toFixed(2);

              return {
                ...item,
                price: stockData.regularMarketPrice,
                percent: finalResult,
                change: change,
                prevClose: stockData.regularMarketPreviousClose,
                open: stockData.regularMarketOpen,
              };
            }
            return item;
          });

          setAllWishlist(prev => [...updatedWishlist]);
          setTimeout(() => {
            update();
          }, 1000);
        }
      } catch (error) {
        toast.error(error, { position: "top-right", autoclose: 2000 });
        
      }
    }
  };

  useEffect(() => {
    getData();
  }, [value.watchlistUpdated]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateStockData();
    }, 2000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h3>Your Wishlist</h3>
        <p>{allWishlist.length}/10</p>
      </div>

      <ul className="wishlist-list">
        {allWishlist.map((stock, idx) => (
          <WatchListItems stock={stock} key={idx} />
        ))}
      </ul>
    </div>
    </>
);

}

export default Wishlist;
