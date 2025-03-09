import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container p-2 nav-container">
        <div className="logo">
          <NavLink className="navbar-brand" to="/">
            <img
              src="media\Images\StockWise1.png"
              alt="Logo"
            />
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent" style={{justifyContent: "flex-end"}}>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={(e) => (e.isActive ? "nav-link active text-primary" : "nav-link")}
                aria-current="page"
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(e) => (e.isActive ? "nav-link active text-primary" : "nav-link")}
                aria-current="page"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(e) => (e.isActive ? "nav-link active text-primary" : "nav-link")}
                aria-current="page"
                to="/product"
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(e) => (e.isActive ? "nav-link active text-primary" : "nav-link")}
                aria-current="page"
                to="/price"
              >
                Pricing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={(e) => (e.isActive ? "nav-link active text-primary" : "nav-link")}
                aria-current="page"
                to="/support"
              >
                Support
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search"></form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
