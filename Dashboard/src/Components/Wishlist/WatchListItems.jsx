import React, { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WatchListButtons from "./WatchListButtons";
import { counterContext } from "../../Content/context";

function WatchListItems({ stock, display, setStockInfo }) {  
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const onMouseEnter = () => {
    setIsMouseEnter(true);
  };
  const onMouseLeave = () => {
    setIsMouseEnter(false);
  };

  return (
    <counterContext.Provider value={{isMouseEnter, setIsMouseEnter}}>
      <li className="wishlist-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="wishlist-item-content">
        <div className={`stock-name ${stock.percent.includes('-') ? "loss" : "profit"}`}>
            <p>{stock.name}</p>
        </div>
        
        <div className="stock-info">
            <p>{stock.price}</p>
            <p className={stock.percent.includes('-') ? "loss" : "profit"}>
                {stock.change} ({stock.percent}%)
            </p>
            {stock.percent.includes('-') ? (
                <ExpandMoreIcon className="icon loss" />
            ) : (
                <ExpandLessIcon className="icon profit" />
            )}
        </div>

        {isMouseEnter && <WatchListButtons uid={stock} setIsMouseEnter={setIsMouseEnter} display={display} setStockInfo={setStockInfo}/>}
    </div>
</li>

    </counterContext.Provider>
  );
}

export default WatchListItems;
