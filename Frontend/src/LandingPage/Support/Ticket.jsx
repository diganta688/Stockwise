import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { useNavigate } from "react-router-dom";

function Ticket() {
  const navigate = useNavigate();

  return (
    <div className="container text-muted py-4">
      <div className="row">
        <p className="text-muted fs-4 text-center">
          To create a ticket, select a relevant topic
        </p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="d-flex align-items-center gap-2">
            <AddCircleOutlineIcon />
            <p className="mb-0">Account Opening</p>
          </div>
          <ul className="list-unstyled mt-2">
            <li className="pb-2 text-primary" onClick={() => navigate("/signup")}>
              Getting started
            </li>
            <li className="pb-2"><a href="#">Online</a></li>
            <li className="pb-2"><a href="#">Offline</a></li>
            <li className="pb-2"><a href="#">Charges</a></li>
            <li className="pb-2"><a href="#">Company, Partnership and HUF</a></li>
            <li className="pb-2"><a href="#">Non Resident Indian (NRI)</a></li>
          </ul>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="d-flex align-items-center gap-2">
            <PermIdentityIcon />
            <p className="mb-0">Your TradeSphere Account</p>
          </div>
          <ul className="list-unstyled mt-2">
            <li className="pb-2"><a href="#">Login credentials</a></li>
            <li className="pb-2"><a href="#">Your Profile</a></li>
            <li className="pb-2"><a href="#">Account modification and segment addition</a></li>
            <li className="pb-2"><a href="#">CMR & DP ID</a></li>
            <li className="pb-2"><a href="#">Nomination</a></li>
            <li className="pb-2"><a href="#">Transfer and conversion of shares</a></li>
          </ul>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="d-flex align-items-center gap-2">
            <BarChartOutlinedIcon />
            <p className="mb-0">Trading and Markets</p>
          </div>
          <ul className="list-unstyled mt-2">
            <li className="pb-2"><a href="#">Trading FAQs</a></li>
            <li className="pb-2"><a href="#">Kite</a></li>
            <li className="pb-2"><a href="#">Margins</a></li>
            <li className="pb-2"><a href="#">Product and order types</a></li>
            <li className="pb-2"><a href="#">Corporate actions</a></li>
            <li className="pb-2"><a href="#">Kite features</a></li>
          </ul>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="d-flex align-items-center gap-2">
            <AccountBalanceWalletIcon />
            <p className="mb-0">Funds & Banking</p>
          </div>
          <ul className="list-unstyled mt-2">
            <li className="pb-2"><a href="#">Fund withdrawal</a></li>
            <li className="pb-2"><a href="#">Adding funds</a></li>
            <li className="pb-2"><a href="#">Adding bank accounts</a></li>
            <li className="pb-2"><a href="#">eMandates</a></li>
          </ul>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="d-flex align-items-center gap-2">
            <BubbleChartIcon />
            <p className="mb-0">Investment & Portfolio</p>
          </div>
          <ul className="list-unstyled mt-2">
            <li className="pb-2"><a href="#">IPO</a></li>
            <li className="pb-2"><a href="#">Portfolio</a></li>
            <li className="pb-2"><a href="#">Funds statement</a></li>
            <li className="pb-2"><a href="#">Profile</a></li>
            <li className="pb-2"><a href="#">Reports</a></li>
            <li className="pb-2"><a href="#">Referral program</a></li>
          </ul>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="d-flex align-items-center gap-2">
            <i className="fa-solid fa-coins"></i>
            <p className="mb-0">Mutual Funds & NPS</p>
          </div>
          <ul className="list-unstyled mt-2">
            <li className="pb-2"><a href="#">Understanding mutual funds and Coin</a></li>
            <li className="pb-2"><a href="#">Coin app</a></li>
            <li className="pb-2"><a href="#">Coin web</a></li>
            <li className="pb-2"><a href="#">Transactions and reports</a></li>
            <li className="pb-2"><a href="#">National Pension Scheme (NPS)</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
