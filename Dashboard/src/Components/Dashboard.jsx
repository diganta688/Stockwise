import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Wishlist from "./Wishlist";
import Summery from "./Summery/Summery";
import Order from "./Order";
import Holdings from "./Holdings/Holding";
import Fund from "./Fund";
import AllStock from "./AllStock";

function Dashboard() {
  const [watchlistUpdated, setWatchlistUpdated] = useState(false);
  const refreshWatchlist = () => {
    setWatchlistUpdated((prev) => !prev);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 p-3 Wishlist" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
          <Wishlist watchlistUpdated={watchlistUpdated} refreshWatchlist={refreshWatchlist}/>
        </div>
        <div className="col-8 p-3 dashboard" >
          <Routes>
            <Route path="summery" element={<Summery watchlistUpdated={watchlistUpdated}/>} />
            <Route path="orders" element={<Order />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="funds" element={<Fund />} />
            <Route path="allStock" element={<AllStock refreshWatchlist={refreshWatchlist}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

