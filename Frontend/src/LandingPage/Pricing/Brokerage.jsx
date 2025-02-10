import React, { useState } from "react";
import Equity from "./priceDevide/Equity";
import Commodity from "./priceDevide/Commodity";
import Currency from "./priceDevide/Currency";

function Brokerage() {
  const [activeTab, setActiveTab] = useState("Equity");
  const renderTabContent = () => {
    switch (activeTab) {
      case "Equity":
        return <Equity />;
      case "Currency":
        return <Currency />;
      case "Commodity":
        return <Commodity />;
      default:
        return <Equity />;
    }
  };

  return (
    <div className="container p-5">
      <div className="row text-center p-5">
        <div className="col mx-2">
          <img src="media\Images\rup-0.svg" alt="" style={{ width: "78%" }} />
          <h1 className="mb-5 " style={{ fontSize: "27px" }}>
            Free equity delivery
          </h1>
          <p className="text-muted">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>
        <div className="col mx-2">
          <img src="media\Images\rup-20.svg" alt="" style={{ width: "78%" }} />
          <h1 className="mb-3 " style={{ fontSize: "27px" }}>
            Intraday and F&O trades
          </h1>
          <p className="text-muted">
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>
        <div className="col mx-2">
          <img src="media\Images\rup-0.svg" alt="" style={{ width: "78%" }} />
          <h1 className="mb-5 " style={{ fontSize: "27px" }}>
            Free direct MF
          </h1>
          <p className="text-muted">
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </p>
        </div>
      </div>
      <div className="row p-5">
        <div className="tabs">
          <button
            className={activeTab === "Equity" ? "active-tab" : ""}
            onClick={() => setActiveTab("Equity")}
          >
            Equity
          </button>
          <button
            className={activeTab === "Currency" ? "active-tab" : ""}
            onClick={() => setActiveTab("Currency")}
          >
            Currency
          </button>
          <button
            className={activeTab === "Commodity" ? "active-tab" : ""}
            onClick={() => setActiveTab("Commodity")}
          >
            Commodity
          </button>
        </div>
        <div className="content">{renderTabContent()}</div>
      </div>
      <div className="row text-center pb-5">
        <h4 style={{ fontWeight: "400", fontSize: "20px" }}>
          <a href="">Calculate your costs upfront</a> using our brokerage
          calculator
        </h4>
      </div>
      <div className="row pb-5">
        <h3>Charges explained</h3>
      </div>
      <div className="row">
        <div className="col">
          <div className="">
            <h6>Securities/Commodities transaction tax</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              Tax by the government when transacting on the exchanges. Charged
              as above on both buy and sell sides when trading equity delivery.
              Charged only on selling side when trading intraday or on F&O.
            </p>
            <p style={{ fontSize: "13px" }} className="m-4">
              When trading at TradeSphere, STT/CTT can be a lot more than the
              brokerage we charge. Important to keep a tab.
            </p>
          </div>
          <div className="mt-5">
            <h6>Transaction/Turnover Charges</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              Charged by exchanges (NSE, BSE, MCX) on the value of your
              transactions.
            </p>
            <p style={{ fontSize: "13px" }} className="m-4">
              BSE has revised transaction charges in XC, XD, XT, Z and ZP groups
              to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been
              merged into a new group X w.e.f 01.12.2017)
            </p>
            <p style={{ fontSize: "13px" }} className="m-4">
              BSE has revised transaction charges in SS and ST groups to
              ₹1,00,000 per crore of gross turnover.
            </p>
            <p style={{ fontSize: "13px" }} className="m-4">
              BSE has revised transaction charges for group A, B and other non
              exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC,
              W, T) at ₹375 per crore of turnover on flat rate basis w.e.f.
              December 1, 2022.
            </p>
            <p style={{ fontSize: "13px" }} className="m-4">
              BSE has revised transaction charges in M, MT, TS and MS groups to
              ₹275 per crore of gross turnover.
            </p>
          </div>
          <div className="mt-5">
            <h6>Call & trade</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              Additional charges of ₹50 per order for orders placed through a
              dealer at TradeSphere including auto square off orders.
            </p>
          </div>
          <div className="mt-5">
            <h6>Stamp charges</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              Stamp charges by the Government of India as per the Indian Stamp
              Act of 1899 for transacting in instruments on the stock exchanges
              and depositories.
            </p>
          </div>
          <div className="mt-5">
            <h6>NRI brokerage charges</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              <ul>
                <li>₹100 per order for futures and options.</li>
                <li>
                  For a non-PIS account, 0.5% or ₹100 per executed order for
                  equity (whichever is lower).
                </li>
                <li>
                  For a PIS account, 0.5% or ₹200 per executed order for equity
                  (whichever is lower).
                </li>
                <li>
                  ₹500 + GST as yearly account maintenance charges (AMC)
                  charges.
                </li>
              </ul>
            </p>
          </div>
          <div className="mt-5">
            <h6>Account with debit balance</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </p>
          </div>
          <div className="mt-5">
            <h6>Charges for Investor's Protection Fund Trust (IPFT) by NSE</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              <ul>
                <li>
                  Equity and Futures - ₹10 per crore + GST of the traded value.
                </li>
                <li>
                  Options - ₹50 per crore + GST traded value (premium value).
                </li>
                <li>
                  Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2
                  per lakh + GST of premium for Options.
                </li>
              </ul>
            </p>
          </div>
          <div className="mt-5">
            <h6>Margin Trading Facility (MTF)</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              <ul>
                <li>
                  MTF Interest: 0.04% per day (₹40 per lakh) on the funded
                  amount. The interest is applied from T+1 day until the day MTF
                  stocks are sold.
                </li>
                <li>
                  MTF Brokerage: 0.03% or Rs. 20/executed order, whichever is
                  lower.
                </li>
                <li>
                  MTF pledge charge: ₹30 + GST per pledge request per ISIN.
                </li>
              </ul>
            </p>
          </div>
          <div className="mt-5">
            <h6>Disclaimer</h6>
          </div>
        </div>
        <div className="col">
          <div className="">
            <h6>GST</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              Tax levied by the government on the services rendered. 18% of (
              brokerage + SEBI charges + transaction charges)
            </p>
          </div>
          <div className="mt-5">
            <h6>SEBI Charges</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              Charged at ₹10 per crore + GST by Securities and Exchange Board of
              India for regulating the markets.
            </p>
          </div>
          <div className="mt-5">
            <h6>DP (Depository participant) charges</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              ₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 TradeSphere fee + ₹2.34 GST) is
              charged on the trading account ledger when stocks are sold,
              irrespective of quantity.
            </p>
            <p style={{ fontSize: "13px" }} className="m-4">
              Female demat account holders (as first holder) will enjoy a
              discount of ₹0.25 per transaction on the CDSL fee.
            </p>
            <p style={{ fontSize: "13px" }} className="m-4">
              Debit transactions of mutual funds & bonds get an additional
              discount of ₹0.25 on the CDSL fee.
            </p>
          </div>
          <div className="mt-5">
            <h6>Pledging charges</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              ₹30 + GST per pledge request per ISIN.
            </p>
          </div>
          <div className="mt-5">
            <h6>AMC (Account maintenance charges)</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              For BSDA demat account: Zero charges if the holding value is less
              than ₹4,00,000. To learn more about BSDA,{" "}
              <a href="">Click here</a>
            </p>
            <p style={{ fontSize: "13px" }} className="m-4">
              For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly
              (90 days). To learn more about AMC, <a href="">Click here</a>
            </p>
          </div>
          <div className="mt-5">
            <h6>Corporate action order charges</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              ₹20 plus GST will be charged for OFS / buyback / takeover /
              delisting orders placed through Console.
            </p>
          </div>
          <div className="mt-5">
            <h6>Off-market transfer charges</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              ₹25 per transaction.
            </p>
          </div>
          <div className="mt-5">
            <h6>Physical CMR request</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST
              for subsequent requests.
            </p>
          </div>
          <div className="mt-5">
            <h6>Payment gateway charges</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              ₹9 + GST (Not levied on transfers done via UPI)
            </p>
          </div>
          <div className="mt-5">
            <h6>Delayed Payment Charges</h6>
            <p style={{ fontSize: "13px" }} className="m-4">
              Interest is levied at 18% a year or 0.05% per day on the debit
              balance in your trading account. <a href="">Learn more.</a>
            </p>
          </div>
        </div>
        <p className="m-4" style={{ fontSize: "13px" }}>
          For Delivery based trades, a minimum of ₹0.01 will be charged per
          contract note. Clients who opt to receive physical contract notes will
          be charged ₹20 per contract note plus courier charges. Brokerage will
          not exceed the rates specified by SEBI and the exchanges. All
          statutory and regulatory charges will be levied at actuals. Brokerage
          is also charged on expired, exercised, and assigned options contracts.
          Free investments are available only for our retail individual clients.
          Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20
          (whichever is less) as delivery brokerage. A brokerage of 0.25% of the
          contract value will be charged for contracts where physical delivery
          happens. For netted off positions in physically settled contracts, a
          brokerage of 0.1% will be charged.
        </p>
      </div>
      <div className="row p-5">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Charges for account opening
          </h2>
          <div className="overflow-x-auto" >
            <table className="min-w-full divide-y divide-gray-200 border " >
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Type of account
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Charges
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Online account</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <button className="btn btn-success">FREE</button>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Offline account</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <button className="btn btn-success">FREE</button>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      NRI account (offline only)
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm text-gray-900">₹ 500</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      Partnership, LLP, HUF, or Corporate accounts (offline
                      only)
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm text-gray-900">₹ 500</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row p-5">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Charges for optional value added services
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Billing Frequency
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Charges
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Tickertape</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      Monthly / Annual
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      Free: 0 | Pro: 249/2399
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Smallcase</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Per transaction</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      Buy & Invest More: 100 | SIP: 10
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Kite Connect</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Monthly</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      Connect: 2000 | Historical: 2000
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
