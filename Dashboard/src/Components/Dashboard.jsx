import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Wishlist from "./Wishlist/Wishlist";
import Summery from "./Summery/Summery";
import Order from "./Order";
import Holdings from "./Holdings/Holding";
import Fund from "./Fund";
import AllStock from "./AllStock";
import {counterUpdate} from "../Content/context"
import WishlistsCeperated from "./Wishlist/WishlistsCeperated"

function Dashboard() {
  const [watchlistUpdated, setWatchlistUpdated] = useState(false);
  return (
    <counterUpdate.Provider value={{watchlistUpdated, setWatchlistUpdated}}>
<div className="container-fluid">
      <div className="row">
        <div className="col-4 p-3 Wishlist" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
          <Wishlist/>
        </div>
        <div className="col-8 p-3 dashboard" >
          <Routes>
            <Route path="summery" element={<Summery/>} />
            <Route path="orders" element={<Order />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="funds" element={<Fund />} />
            <Route path="allStock" element={<AllStock/>} />
            <Route path="Wishlists" element={<WishlistsCeperated/>} />
          </Routes>
        </div>
      </div>
    </div>
    </counterUpdate.Provider>
  );
}

export default Dashboard;

