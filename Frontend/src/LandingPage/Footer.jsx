import React from "react";

function Footer() {
  return (
    <div className="border-top">
      <div className="container footer-container">
        <div className="footer-first">
          <div className="footer-first-col">
            <img
              src="media\Images\logo.svg"
              alt="logo"
              style={{ width: "50%" }}
              className="mb-4 mt-1"
            />
            <p className="stock-copy-right">
              © 2010 - 2024, Zerodha Broking Ltd. All rights reserved.
            </p>
            <div className="social-icon ">
              <div className="border-bottom p-1">
                <i class="fa-brands fa-x-twitter"></i>
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-linkedin"></i>
              </div>
              <div className="p-1">
                <i class="fa-brands fa-youtube"></i>
                <i class="fa-brands fa-whatsapp"></i>
                <i class="fa-brands fa-telegram"></i>
              </div>
            </div>
          </div>
          <div className="footer-first-col">
            <ul>
              <a href="">
                <li className="nav-head mb-3 foot-li">Company</li>
              </a>
              <a href="">
                <li className="foot-li">About</li>
              </a>
              <a href="">
                <li className="foot-li">Products</li>
              </a>
              <a href="">
                <li className="foot-li">Pricing</li>
              </a>
              <a href="">
                <li className="foot-li">Referral programme</li>
              </a>
              <a href="">
                <li className="foot-li">Careers</li>
              </a>
              <a href="">
                <li className="foot-li">Zerodha.tech</li>
              </a>
              <a href="">
                <li className="foot-li">Press & media</li>
              </a>
              <a href="">
                <li className="foot-li">Zerodha Cares</li>
              </a>
            </ul>
          </div>
          <div className="footer-first-col">
            <ul>
              <a href="">
                <li className="nav-head mb-3 foot-li">Support</li>
              </a>
              <a href="">
                <li className="foot-li">Contact us</li>
              </a>
              <a href="">
                <li className="foot-li">Support portal</li>
              </a>
              <a href="">
                <li className="foot-li">Z-Connect blog</li>
              </a>
              <a href="">
                <li className="foot-li">List of charges</li>
              </a>
              <a href="">
                <li className="foot-li">Downloads & resources</li>
              </a>
              <a href="">
                <li className="foot-li">Videos</li>
              </a>
              <a href="">
                <li className="foot-li">Market overview</li>
              </a>
              <a href="">
                <li className="foot-li">How to file a complaint?</li>
              </a>
              <a href="">
                <li className="foot-li">Status of your complaints</li>
              </a>
            </ul>
          </div>
          <div className="footer-first-col">
            <ul>
              <a href="">
                <li className="nav-head mb-3 foot-li">Account</li>
              </a>
              <a href="">
                <li className="foot-li">Open an account</li>
              </a>
              <a href="">
                <li className="foot-li">Fund transfer</li>
              </a>
            </ul>
          </div>
        </div>
        <div className="footer-info">
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration
            no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha
            Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity
            Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001
            – SEBI Registration no.: INZ000038238 Registered Address: Zerodha
            Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence
            Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka,
            India. For any complaints pertaining to securities broking please
            write to complaints@zerodha.com, for DP related to dp@zerodha.com.
            Please ensure you carefully read the Risk Disclosure Document as
            prescribed by SEBI | ICF
          </p>
          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>
          <p>
            Smart Online Dispute Resolution | Grievances Redressal Mechanism
          </p>
          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>
          <p>
            Attention investors: 1) Stock brokers can accept securities as
            margins from clients only by way of pledge in the depository system
            w.e.f September 01, 2020. 2) Update your e-mail and phone number
            with your stock broker / depository participant and receive OTP
            directly from depository on your e-mail and/or mobile number to
            create pledge. 3) Check your securities / MF / bonds in the
            consolidated account statement issued by NSDL/CDSL every month.
          </p>
          <p>
            "Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day. Issued in the interest of
            investors. KYC is one time exercise while dealing in securities
            markets - once KYC is done through a SEBI registered intermediary
            (broker, DP, Mutual Fund etc.), you need not undergo the same
            process again when you approach another intermediary." Dear
            Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the Bank account number and sign the
            IPO application form to authorize your bank to make payment in case
            of allotment. In case of non allotment the funds will remain in your
            bank account. As a business we don't give stock tips, and have not
            authorized anyone to trade on behalf of others. If you find anyone
            claiming to be part of Zerodha and offering such services, please
            create a ticket here.
          </p>
        </div>
        <div className="row text-center">
          <ul className="footer-last-content">
            <li className="foot-li">NSE</li>
            <li className="foot-li">BSE</li>
            <li className="foot-li">MCX</li>
            <li className="foot-li" >Terms & conditions</li>
            <li className="foot-li">Policies & procedures</li>
            <li className="foot-li">Privacy policy</li>
            <li className="foot-li">Disclosure</li>
            <li className="foot-li">For investor's attention</li>
            <li className="foot-li">Investor charter</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
