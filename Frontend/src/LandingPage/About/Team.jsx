import React from "react";

function Team() {
  return (
    <div className="container p-5">
      <div className="row text-center people mb-5">
        <p>People</p>
      </div>
      <div className="row">
        <div className="col-6 imageFounder text-center">
          <img src="media\Images\meFounder.jpg" alt="OwnerImage" />
          <div className="row ">
            <p
              className="mt-4 fs-4 mb-0"
              style={{ color: "rgb(60 57 57 / 83%)" }}
            >
              Diganta Chakraborty
            </p>
          </div>
          <div className="row">
            <p style={{ color: "#9b9b9b" }}>Founder, CEO</p>
          </div>
        </div>
        <div className="col-5 mt-4">
          <p>
            Diganta bootstrapped and founded this Stock exchange platform in
            2010 to overcome the hurdles he faced during his decade long stint
            as a trader. Today, this Stock exchange platform has changed the
            landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on <a href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
