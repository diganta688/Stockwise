import React from "react";
import OpenAcc from "../OpenAcc";

function Universe() {
  return (
    <>
      <div className="container p-5" style={{color: "black"}}>
        <div className="row text-center p-5">
          <h1 className="fs-4 mb-5">
            Want to know more about our technology stack? Check out the &nbsp;
            <a href="">Stock.tech</a> blog.
          </h1>
        </div>
        <div className="row mt-5 text-center">
          <h1 className="fs-1 mb-4">The Stock Universe</h1>
          <p>
            Extend your trading and investment experience even further with our
            partner platforms
          </p>
        </div>
        <div className="text-center p-5 pb-0 partners">
          <div >
            <a href="">
              <img
                src="media\Images\zerodhaFundhouse.png"
                alt=""
                style={{ width: "150px", height: "45px" }}
                className="mb-3"
              />
              <p className = "product-univerce-partners text-muted">
                Our asset management venture that is creating simple and
                transparent index funds to help you save for your goals.
              </p>
            </a>
          </div>
          <div >
            <a href="">
              <img
                src="media\Images\sensibullLogo.svg"
                alt=""
                style={{ width: "150px", height: "45px" }}
                className="mb-3"
              />
              <p className = "product-univerce-partners text-muted">
                Options trading platform that lets you create strategies,
                analyze positions, and examine data points like open interest,
                FII/DII, and more.
              </p>
            </a>
          </div>
          <div >
            <a href="">
              <img
                src="media\Images\tijori.svg"
                alt=""
                style={{ width: "150px", height: "45px" }}
                className="mb-3"
              />
            <p className = "product-univerce-partners text-muted">
              Investment research platform that offers detailed insights on
              stocks, sectors, supply chains, and more.
            </p>
            </a>
          </div>
        </div>
        <div className="text-center p-5 partners">
          <div >
            <a href="">
              <img
                src="media\Images\streakLogo.png"
                alt=""
                style={{ width: "150px", height: "45px" }}
                className="mb-3"
              />
              <p className = "product-univerce-partners text-muted">
                Systematic trading platform that allows you to create and
                backtest strategies without coding.
              </p>
            </a>
          </div>
          <div >
            <a href="">
              <img
                src="media\Images\smallcaseLogo.png"
                alt=""
                style={{ width: "150px", height: "45px" }}
                className="mb-3"
              />
              <p className = "product-univerce-partners text-muted">
                Thematic investing platform that helps you invest in diversified
                baskets of stocks on ETFs.
              </p>
            </a>
          </div>
          <div >
            <a href="">
              <img
                src="media\Images\dittoLogo.png"
                alt=""
                style={{ width: "150px", height: "45px" }}
                className="mb-3"
              />
              <p className = "product-univerce-partners text-muted">
                Personalized advice on life and health insurance. No spam and no
                mis-selling.
              </p>
            </a>
          </div>
        </div>
      </div>
      <OpenAcc />
    </>
  );
}

export default Universe;
