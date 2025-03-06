import React from 'react';

const Universe = () => {
    return (
        <div className="container p-5" style={{ color: "black" }}>
            <div className="row text-center p-5">
                <h1 className="fs-4 mb-5">
                    Want to know more about our technology stack? Check out the &nbsp;
                    <a href="">Stock.tech</a> blog.
                </h1>
            </div>
            <div className="row mt-5 text-center">
                <h1 className="fs-1 mb-4">The Stock Universe</h1>
                <p>
                    Extend your trading and investment experience even further with our partner platforms
                </p>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 text-center p-3">
                <div className="col">
                    <a href="">
                        <img src="media/Images/zerodhaFundhouse.png" alt="Zerodha Fundhouse" className="img-fluid mb-3" style={{ width: "150px", height: "45px" }} />
                        <p className="text-muted">
                            Our asset management venture that is creating simple and transparent index funds to help you save for your goals.
                        </p>
                    </a>
                </div>
                <div className="col">
                    <a href="">
                        <img src="media/Images/sensibullLogo.svg" alt="Sensibull" className="img-fluid mb-3" style={{ width: "150px", height: "45px" }} />
                        <p className="text-muted">
                            Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.
                        </p>
                    </a>
                </div>
                <div className="col">
                    <a href="">
                        <img src="media/Images/tijori.svg" alt="Tijori" className="img-fluid mb-3" style={{ width: "150px", height: "45px" }} />
                        <p className="text-muted">
                            Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.
                        </p>
                    </a>
                </div>

            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 text-center p-3">
                <div className="col">
                    <a href="">
                        <img src="media\Images\streakLogo.png" alt="Streak" className="img-fluid mb-3" style={{ width: "150px", height: "45px" }} />
                        <p className="text-muted">
                            Algo trading platform that lets you create, backtest, and deploy strategies without coding.
                        </p>
                    </a>
                </div>
                <div className="col">
                    <a href="">
                        <img src="media\Images\smallcaseLogo.png" alt="Smallcase" className="img-fluid mb-3" style={{ width: "150px", height: "45px" }} />
                        <p className="text-muted">
                            Thematic investment platform that lets you invest in portfolios curated by experts.
                        </p>
                    </a>
                </div>
                <div className="col">
                    <a href="">
                        <img src="media\Images\dittoLogo.png" alt="Ditto Insurance" className="img-fluid mb-3" style={{ width: "150px", height: "45px" }} />
                        <p className="text-muted">
                            Insurance advisory platform that helps you choose the best health and term insurance.
                        </p>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Universe;
