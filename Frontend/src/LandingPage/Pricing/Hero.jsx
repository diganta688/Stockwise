import React from "react";

function Hero() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 text-center">
          <h1 className="fs-1 mb-3">Charges</h1>
          <h2
            className="fs-5 text-muted"
            style={{ fontWeight: "400", fontSize: "clamp(14px, 4vw, 20px)" }}
          >
            List of all charges and taxes
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Hero;
