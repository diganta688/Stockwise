import React, { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WatchListButtons from "./WatchListButtons";
import { counterContext } from "../Content/context";

function WatchListItems({ stock, refreshWatchlist }) {  
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const onMouseEnter = () => {
    setIsMouseEnter(true);
  };
  const onMouseLeave = () => {
    setIsMouseEnter(false);
  };

  return (
    <counterContext.Provider value={{isMouseEnter, setIsMouseEnter}}>
      <li
        className="wachlist-li"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="wishlist-item">
          <div className={stock.percent.includes('-') ? "loss name" : "profit name"}>
            <p>{stock.name}</p>
          </div>
          <div className="options">
            {isMouseEnter && (
              <WatchListButtons
                uid={stock}
                refreshWatchlist={refreshWatchlist}
              />
            )}
          </div>
          <div className="groth">
            <div className={stock.percent.includes('-') ? "loss percentage" : "profit percentage"}>
              <p style={{  }}>
                {stock.change}&nbsp;
                ({stock.percent}%)
              </p>
            </div>
            <div className="">
              {stock.percent.includes('-')? (
                <ExpandMoreIcon className="loss" />
              ) : (
                <ExpandLessIcon className="profit" />
              )}
            </div>
            <div
              className=""
              style={{ maxWidth: "60px", minWidth: "60px" }}
            >
              <p>{stock.price}</p>
            </div>
          </div>
        </div>
      </li>
    </counterContext.Provider>
  );
}

export default WatchListItems;
