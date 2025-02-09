import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function LeftSection({ image, platformName, description, gplayIcon, appleplayIcon }) {
  return (
    <div className="container p-5 pt-0 pb-0">
      <div className="row">
        <div className="col-6 p-3">
          <img
            src={image}
            alt="KiteLogo"
            style={{ width: "100%" }}
            className= ""
          />
        </div>
        <div className="col-6 mt-5 p-5">
          <h1 className="fs-2 mb-4">{platformName}</h1>
          <p className="">{description}</p>
          <div className="row mb-4">
            <div className="col-4">
              <a href="">
                Try demo <ArrowRightAltIcon />
              </a>
            </div>
            <div className="col-5">
              <a href="">
                Learn more <ArrowRightAltIcon />
              </a>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row">
            <div className="col">
              <a href="">
                <img src={gplayIcon} alt="playstore" />
              </a>
            </div>
            <div className="col">
              <a href="">
                <img src={appleplayIcon} alt="applestore" />
              </a>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}

export default LeftSection;
