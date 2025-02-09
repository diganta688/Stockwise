import React from "react";

function RightSection({image,  platformName, description}) {
  return (
    <div className="container p-5 pt-0 pb-0">
      <div className="row">
        <div className="col-6 mt-5 p-5">
          <h1 className="fs-2 mb-4 mt-4">{platformName}</h1>
          <p className="">{description}</p>
        </div>
        <div className="col-6 p-3">
          <img
            src={image}
            alt="KiteLogo"
            style={{ width: "100%" }}
            className=""
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
