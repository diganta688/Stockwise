import React from "react";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-5">
        <div className="col-5 mr-5 p-5">
          <h1 className="mb-5" style={{ fontSize: "2rem" }}>
            Trust with confidence
          </h1>
          <div className="why-us ">
            <h2 className="fs-4">Customer-first always</h2>
            <p className="text-muted">
              That's why 1.5+ crore customers trust TradeSphere with ₹4.5+ lakh
              crores of equity investments and contribute to 15% of daily retail
              exchange volumes in India.
            </p>
          </div>
          <div className="why-us ">
            <h2 className="fs-4">No spam or gimmicks</h2>
            <p className="text-muted">
              No gimmicks, spam, "gamification", or annoying push notifications.
              High quality apps that you use at your pace, the way you like.
            </p>
          </div>
          <div className="why-us ">
            <h2 className="fs-4">The TradeSphere universe</h2>
            <p className="text-muted">
              Not just an app, but a whole ecosystem. Our investments in 30+
              fintech startups offer you tailored services specific to your
              needs.
            </p>
          </div>
          <div className="why-us ">
            <h2 className="fs-4">Do better with money</h2>
            <p className="text-muted">
              With initiatives like Nudge and Kill Switch, we don't just
              facilitate transactions, but actively help you do better with your
              money.
            </p>
          </div>
        </div>
        <div className="col-7 p-5">
          <img
            className=""
            src="media\Images\ecosystem.png"
            alt="ecosystem"
            style={{ width: "89%" }}
          />
          <div
            className=" rowexploreLinks text-center"
            style={{ fontSize: "17px", color: "#rgb(56, 126, 209)",  fontWeight: "500" }}
          >
            <a href="" className="mx-5">
              Explore our products
              <ArrowRightAltIcon/>
            </a>
            <a href="" className="mx-3">
              Try Kite demo
              <ArrowRightAltIcon/>
            </a>
          </div>
        </div>
        <div className="text-center">
          <img
            src="media\Images\pressLogos.png"
            alt="pressLogos"
            style={{ width: "65%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Stats;
