import React, { useEffect, useState } from "react";
import { Charts } from "./Charts";
import HoldingCount from "./HoldingCount";
import axios from "axios";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Holdings = () => {
  let { id } = useParams();
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalCurrValue, setTotalCurrValue] = useState(0);
  const [allHoldings, setAllHoldings] = useState([]);
  const [activeTab, setActiveTab] = useState("HoldingCount");

  let get = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/allHoldings/${id}`).then((res) => {
        let holdings = res.data.holdings;
        setAllHoldings(res.data.holdings);
        const investment = holdings.reduce(
          (acc, stock) => acc + stock.avg * stock.qty,
          0
        );
        setTotalInvestment(investment);
        const currValue = holdings.reduce(
          (acc, stock) => acc + stock.currPrice * stock.qty,
          0
        );
        setTotalCurrValue(currValue);
      });
    } catch (error) {
      toast.error(error,  { position: "top-right" , autoclose: 2000})
    }
  };
  
  const update =async ()=>{
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/update-holding`,
      {
        data: allHoldings,
      }
    );
  }

  const data= async()=>{
    if(allHoldings.length>0){
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/update-stock-wishlist`,
          {
            names: allHoldings.map((item) => item.name),
          }
        );
        if (response.status === 200) {
          const { data } = response.data;
          const updateHolding = allHoldings.map((item) => {
            const stockData = data.find((stock) => stock.symbol === item.name);
              if (stockData) {
                return{...item,
                  currPrice:stockData.regularMarketPrice,
                  net: stockData.regularMarketPrice - (item.priceBuy/item.qty),
                  day:stockData.regularMarketChangePercent,
                }
              }
              return item;
          })
          setAllHoldings(updateHolding);
          setTimeout(() => {
            update();
          }, 1000);
        }
      } catch (error) {
        toast.error(error,  { position: "top-right" , autoclose: 2000})
      }
    }
  }

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
      const interval = setInterval(() => {
        data();        
      }, 2000);
  
      return () => clearInterval(interval);
    }, [allHoldings]);

  const renderTabContent = () => {
    const labels = allHoldings.map((a) => a["name"]);
    const data = {
      labels,
      datasets: [
        {
          label: "Price when you buy this stock",
          data: allHoldings.map((a) => a.priceBuy.toFixed(2)),
          backgroundColor: "rgba(247, 65, 90, 0.63)",
        },
        {
          label: "Price of the Stock now",
          data: allHoldings.map((stock) => {
            let currvalue = stock.currPrice*stock.qty;
            return currvalue;
          }),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    switch (activeTab) {
      case "HoldingCount":
        return (
          <HoldingCount
            allHoldings={allHoldings}
            totalInvestment={totalInvestment}
            totalCurrValue={totalCurrValue}
          />
        );
      case "HoldingChart":
        return <Charts data={data} />;
      default:
        return (
          <HoldingCount
            allHoldings={allHoldings}
            totalInvestment={totalInvestment}
            totalCurrValue={totalCurrValue}
          />
        );
    }
  };

  return (
    <>
      {allHoldings.length === 0 ? (
        <div className="text-center order">
          <MenuBookIcon fontSize="large" />
          <p className="fs-5 text-muted p-3">
            You haven’t Holding 
          </p>
        </div>
      ) : (
        <>
          <button
            className={
              activeTab === "HoldingCount"
                ? "active-tab holding-btn"
                : "holding-btn"
            }
            onClick={() => setActiveTab("HoldingCount")}
          >
            Holdings ({allHoldings.length})
          </button>
          <button
            className={
              activeTab === "HoldingChart"
                ? "active-tab holding-btn"
                : "holding-btn"
            }
            onClick={() => setActiveTab("HoldingChart")}
          >
            Holdings Chart
          </button>
          {renderTabContent()}
        </>
      )}
    </>
  );
};

export default Holdings;
