import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Hero() {
  return (
    <div className="support-main" style={{ backgroundColor: "#387ed1", color: "#fff", padding: "40px 0" }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <h4 className="p-3 p-md-5">
              <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                Support portal
              </a>
            </h4>
            <h3 className="px-3 px-md-5 fs-5" style={{ fontWeight: "400" }}>
              Search for an answer or browse help topics to create a ticket
            </h3>

            <div className="mt-4 px-3 px-md-5">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Eg: how do I activate F&O, why is my order getting rejected..."
                  inputProps={{
                    "aria-label": "Search support articles",
                  }}
                  style={{ padding: "10px" }}
                />
                <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>

            <div className="support-links-top mt-4 px-3 px-md-5">
              <div className="d-flex flex-wrap gap-3">
                <a href="#" className="text-white text-decoration-underline">Track account opening</a>
                <a href="#" className="text-white text-decoration-underline">Track segment activation</a>
                <a href="#" className="text-white text-decoration-underline">Intraday margins</a>
                <a href="#" className="text-white text-decoration-underline">Kite user manual</a>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="track-ticket text-end pe-3 pe-md-5">
              <a
                href="#"
                style={{
                  fontSize: "18px",
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                Track tickets
              </a>
            </div>

            <div className="p-3 p-md-5 pt-3">
              <h3>Featured</h3>
              <ol className="mt-3 ps-3">
                <li className="pb-3">
                  <a
                    href="#"
                    style={{
                      fontSize: "16px",
                      color: "white",
                      textDecoration: "underline",
                    }}
                  >
                    Offer for sale (OFS) - January 2025
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      fontSize: "16px",
                      color: "white",
                      textDecoration: "underline",
                    }}
                  >
                    Surveillance measure on scrips - January 2025
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;



