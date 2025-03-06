import React from "react";

function RightSection({image,  platformName, description}) {
  return (
    <div className="container p-5 pt-0 pb-0">
  <div className="row align-items-center flex-column-reverse flex-md-row">
    <div className="col-12 col-md-6 mt-3 mt-md-5 p-3 p-md-5 text-center text-md-start">
      <h1 className="fs-4 fs-md-2 mb-3 mt-3 mt-md-4">{platformName}</h1>
      <p>{description}</p>
    </div>
    <div className="col-12 col-md-6 p-3">
      <img src={image} alt="Platform" className="img-fluid" />
    </div>
  </div>
</div>

  );
}

export default RightSection;
