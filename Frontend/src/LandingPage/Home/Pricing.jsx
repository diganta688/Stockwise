import React from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function Pricing() {
  return (
    <div className="container p-5 pricing-container">
      <div className="row p-5 pricing-row">
        <div className="col-5 pricing-text">
          <h1 className="fs-2">Unbeatable pricing</h1>
          <p className="text-muted">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" className="">
            See pricing
            <ArrowRightAltIcon/>
          </a>
        </div>
        <div className="col-7 mt-4 pricing-img">
          <div className="row">
            <div className="col-4">
              <div className="row ">
                <div className="col p-0 ">
                  <img
                    src="media\Images\rup-0.svg"
                    alt="rupees0"
                  />
                </div>
                <div
                  className="col p-0"
                  style={{
                    fontSize: "10px",
                    position: "relative",
                    left: "-35px",
                  }}
                >
                  <p className="mt-5">Free account opening</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col p-0">
                  <img
                    src="media\Images\rup-0.svg"
                    alt="rupees0"
                  />
                </div>
                <div
                  className="col p-0"
                  style={{
                    fontSize: "10px",
                    position: "relative",
                    left: "-35px",
                    top: "15px",
                  }}
                >
                  <p className="mt-4">
                    Free equity delivery and direct mutual funds
                  </p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col p-0">
                  <img
                    src="media\Images\rup-20.svg"
                    alt="rupees20"
                  />
                </div>
                <div
                  className="col p-0"
                  style={{
                    fontSize: "10px",
                    position: "relative",
                    left: "-20px",
                  }}
                >
                  <p className="mt-5">Intraday and F&O</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
