import React from "react";
import { useNavigate } from "react-router-dom";


function Hero() {
  const navigate = useNavigate();

  return (
    <div className="container p-5">
      <div className="row text-center home-hero">
        <img
          src="/media/Images/homeHero.png"
          alt="HomeHero image"
          className="mb-5"
          style={{width: "80%"}}
        />
        <h1 className="fs-2">Invest in everything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, ETFs,
          bonds, and more.
        </p>
        <button 
          style={{ width: "17%", margin: "0 auto", background: "#387ed1" }}
          className="fs-5"
          onClick={()=>  navigate("/signup")}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default Hero;
