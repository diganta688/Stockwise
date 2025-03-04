import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function Education() {
  return (
    <div className="container p-5 education-container">
      <div className="row p-5 education-row">
        <div className="col-5 education-image">
          <img
            src="media\Images\education.svg"
            alt="varsityImage"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-1"></div>
        <div className="col-6 mt-5 education-text">
          <h1 className="fs-2">Free and open market education</h1>
          <div className="row mt-4">
            <p className="text-muted">
              Varsity, the largest online stock market education book in the
              world covering everything from the basics to advanced trading.
            </p>
            <a href="" className="">
              Varsity
              <ArrowRightAltIcon />
            </a>
          </div>
          <div className="row mt-4">
            <p className="text-muted">
              TradingQ&A, the most active trading and investment community in
              India for all your market related queries.
            </p>
            <a href="" className="">
              TradingQ&A
              <ArrowRightAltIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
