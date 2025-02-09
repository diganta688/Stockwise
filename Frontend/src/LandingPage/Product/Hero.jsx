import React from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function Hero() {
  return (
    <div className="container p-5 pt-0 pb-0">
      <div className="row text-center border-bottom row-first-product">
        <p className="product-hero">Products</p>
        <p className="product-hero-sub text-muted">Sleek, modern, and intuitive trading platforms</p>
        <p className="product-hero-sub text-muted">
          Check out our &nbsp;
          <a href="" className="">
            investment offerings
            <ArrowRightAltIcon/>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
