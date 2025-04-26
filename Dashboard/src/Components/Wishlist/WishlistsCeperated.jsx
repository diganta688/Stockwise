import React, { useEffect, useState, useContext } from "react";
import WatchListItems from "./WatchListItems";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { counterUpdate } from "../../Content/context";
import SecondAtockAnalyse from "./SecondAtockAnalyse";
import "./Style.css";

function WishlistsCeperated() {
  const value = useContext(counterUpdate);
  const { id } = useParams();
  const [allWishlist, setAllWishlist] = useState([]);
  const [stockInfo, setStockInfo] = useState({});
  const [showAnalyse, setShowAnalyse] = useState(false);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/wishlist/allwishlist/${id}`,
        { withCredentials: true }
      );
      setAllWishlist(res.data.wishlists);
    } catch (error) {
      toast.error(error.message || "Error fetching wishlist", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const update = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist/update-wishlist`,
        { userId: id, data: allWishlist },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error("Failed to update wishlist", { autoClose: 2000 });
    }
  };
  const updateStockData = async () => {
    if (allWishlist.length > 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/wishlist/update-stock-wishlist`,
          { names: allWishlist.map((item) => item.name) },
          { withCredentials: true }
        );

        if (response.status === 200) {
          const { data } = response.data;

          const updatedWishlist = allWishlist.map((item) => {
            const stockData = data.find((stock) => stock.symbol === item.name);
            if (stockData) {
              const percentage =
                ((stockData.regularMarketPrice - stockData.regularMarketPreviousClose) /
                  stockData.regularMarketPreviousClose) *
                100;

              const finalResult = percentage.toFixed(2);
              const change = (
                stockData.regularMarketPrice - stockData.regularMarketPreviousClose
              ).toFixed(2);

              return {
                ...item,
                price: stockData.regularMarketPrice,
                percent: finalResult,
                change,
                prevClose: stockData.regularMarketPreviousClose,
                open: stockData.regularMarketOpen,
              };
            }
            return item;
          });

          setAllWishlist(updatedWishlist);

          setTimeout(() => {
            update();
          }, 1000);
        }
      } catch (error) {
        toast.error(error.message || "Error updating stock data", {
          position: "top-right",
          autoClose: 2000,
        });
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
  }, [allWishlist]);

  useEffect(() => {
    if (allWishlist.length > 0) {
      const timer = setTimeout(() => {
        setShowAnalyse(true);
        setStockInfo((prev) => {
          return Object.keys(prev).length === 0 ? allWishlist[0] : prev;
        });
      }, 1000);

      return () => clearTimeout(timer); 
    } else {
      setShowAnalyse(false);
      setStockInfo({});
    }
  }, [allWishlist]);

  const setSelectedStock = (stock) => {
    setStockInfo(stock);
  };

  return (
    <div className="wishlist-ceperate">
      <div className="wishlist-section">
        <div className="wishlist-header" style={{ marginBottom: "15px" }}>
          <h3>Your Wishlist</h3>
          <p>{allWishlist.length}/10</p>
        </div>

        <ul className="wishlist-list" style={{ listStyleType: "none", padding: "0" }}>
          {allWishlist.map((stock, idx) => (
            <WatchListItems
              stock={stock}
              key={idx}
              display={false}
              setStockInfo={setSelectedStock}
            />
          ))}
        </ul>
      </div>

      <div className="analyse-section">
        {showAnalyse && allWishlist.length > 0 && (
          <SecondAtockAnalyse stockInfo={stockInfo} />
        )}
      </div>
    </div>
  );
}

export default WishlistsCeperated;
