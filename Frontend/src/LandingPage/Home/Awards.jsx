import React from "react";

function Awards() {
  return (
    <div className="container p-5">
      <div className="row p-5">
        <div className="col-6 p-2">
          <img src="media/Images/largestBroker.svg" alt="largestBrokerAward" style={{width: "80%"}}/>
        </div>
        <div className="col-6 mt-5">
          <h1 className="fs-2">Largest stock brocker in India</h1>
          <p>
            2+ million TradeSphere cllents contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row text-cente">
            <div className="col-6">
              <ul>
                <li>Feature and option</li>
                <li>Commodity</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>Stocks & IPOs</li>
                <li>Direct mutuals</li>
                <li>Brokerage</li>
              </ul>
            </div>
          </div>
          <img
            src="media\Images\pressLogos.png"
            alt="pressLogos"
            style={{ width: "90%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Awards;
