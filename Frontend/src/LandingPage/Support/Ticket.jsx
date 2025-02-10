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
    <div className="container text-muted">
      <div className="row">
        <p className="text-muted fs-4 p-5">
          To create a ticket, select a relevant topic
        </p>
      </div>
      <div className="row">
        <div className="col">
          <div className="">
            <AddCircleOutlineIcon />
            <p style={{ display: "inline", marginLeft: "0.5rem" }}>
              Account Oppening
            </p>
          </div>
          <div className="px-3 py-2">
            <ul style={{ listStyleType: "none" }}>
              <li className="foot-li pb-3" onClick={() => navigate("/signup")} style={{color: "#000dff85"}}>
              Getting started
              </li>
              <li className="pb-3">
                <a href="">Online</a>
              </li>
              <li className="pb-3">
                <a href="">Offline</a>
              </li>
              <li className="pb-3">
                <a href="">Charges</a>
              </li>
              <li className="pb-3">
                <a href="">Company, Partnership and HUF</a>
              </li>
              <li className="pb-3">
                <a href="">Non Resident Indian (NRI)</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col">
          <div className="">
            <PermIdentityIcon />
            <p style={{ display: "inline", marginLeft: "0.5rem" }}>
              Your TradeSphere Account
            </p>
          </div>
          <div className="px-3 py-2">
            <ul style={{ listStyleType: "none" }}>
              <li className="pb-3">
                <a href="">Login credentials</a>
              </li>
              <li className="pb-3">
                <a href="">Your Profile</a>
              </li>
              <li className="pb-3">
                <a href="">Account modification and segment addition</a>
              </li>
              <li className="pb-3">
                <a href="">CMR & DP ID</a>
              </li>
              <li className="pb-3">
                <a href="">Nomination</a>
              </li>
              <li className="pb-3">
                <a href="">Transfer and conversion of shares</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col">
          <div className="">
            <BarChartOutlinedIcon />
            <p style={{ display: "inline", marginLeft: "0.5rem" }}>
              Trading and Markets
            </p>
          </div>
          <div className="px-3 py-2">
            <ul style={{ listStyleType: "none" }}>
              <li className="pb-3">
                <a href="">Trading FAQs</a>
              </li>
              <li className="pb-3">
                <a href="">Kite</a>
              </li>
              <li className="pb-3">
                <a href="">Margins</a>
              </li>
              <li className="pb-3">
                <a href="">Product and order types</a>
              </li>
              <li className="pb-3">
                <a href="">Corporate actions</a>
              </li>
              <li className="pb-3">
                <a href="">Kite features</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="">
            <AccountBalanceWalletIcon />
            <p style={{ display: "inline", marginLeft: "0.5rem" }}>
              Account Oppening
            </p>
          </div>
          <div className="px-3 py-2">
            <ul style={{ listStyleType: "none" }}>
              <li className="pb-3">
                <a href="">Fund withdrawal</a>
              </li>
              <li className="pb-3">
                <a href="">Adding funds</a>
              </li>
              <li className="pb-3">
                <a href="">Adding bank accounts</a>
              </li>
              <li className="pb-3">
                <a href="">eMandates</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col">
          <div className="">
            <BubbleChartIcon />
            <p style={{ display: "inline", marginLeft: "0.5rem" }}>
              Your TradeSphere Account
            </p>
          </div>
          <div className="px-3 py-2">
            <ul style={{ listStyleType: "none" }}>
              <li className="pb-3">
                <a href="">IPO</a>
              </li>
              <li className="pb-3">
                <a href="">Portfolio</a>
              </li>
              <li className="pb-3">
                <a href="">Funds statement</a>
              </li>
              <li className="pb-3">
                <a href="">Profile</a>
              </li>
              <li className="pb-3">
                <a href="">Reports</a>
              </li>
              <li className="pb-3">
                <a href="">Referral program</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col">
          <div className="">
            <i class="fa-solid fa-coins"></i>
            <p style={{ display: "inline", marginLeft: "0.5rem" }}>
              Trading and Markets
            </p>
          </div>
          <div className="px-3 py-2">
            <ul style={{ listStyleType: "none" }}>
              <li className="pb-3">
                <a href="">Understanding mutual funds and Coin</a>
              </li>
              <li className="pb-3">
                <a href="">Coin app</a>
              </li>
              <li className="pb-3">
                <a href="">Coin web</a>
              </li>
              <li className="pb-3">
                <a href="">Transactions and reports</a>
              </li>
              <li className="pb-3">
                <a href="">National Pension Scheme (NPS)</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
}

export default Ticket;
