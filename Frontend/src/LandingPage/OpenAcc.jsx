import React from "react";
import { useNavigate } from "react-router-dom";

function OpenAcc() {
  const navigate = useNavigate();
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center home-hero">
        <h1 className="fs-2">Open a TradeSphere account</h1>
        <p>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <button
          style={{ width: "17%", margin: "0 auto", background: "#387ed1" }}
          className="fs-5"
          onClick={()=>navigate("/signup")}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default OpenAcc;
