import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

function LeftSection({ image, platformName, description, gplayIcon, appleplayIcon }) {
  return (
    <div className="container p-5 pt-0 pb-0">
  <div className="row align-items-center">
    <div className="col-12 col-md-6 p-3">
      <img src={image} alt="Platform Logo" className="img-fluid" />
    </div>
    <div className="col-12 col-md-6 mt-3 mt-md-5 p-3 p-md-5">
      <h1 className="fs-4 fs-md-2 mb-3">{platformName}</h1>
      <p>{description}</p>
      <div className="row mb-4 g-3">
        <div className="col-6 col-sm-4">
          <a href="" className="d-inline-flex align-items-center gap-1">
            Try demo <ArrowRightAltIcon />
          </a>
        </div>
        <div className="col-6 col-sm-4">
          <a href="" className="d-inline-flex align-items-center gap-1">
            Learn more <ArrowRightAltIcon />
          </a>
        </div>
      </div>
      <div className="row g-2">
        <div className="col-6 col-sm-4">
          <a href="">
            <img src={gplayIcon} alt="Google Play" className="img-fluid" />
          </a>
        </div>
        <div className="col-6 col-sm-4">
          <a href="">
            <img src={appleplayIcon} alt="Apple Store" className="img-fluid" />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default LeftSection;
