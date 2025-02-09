import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function Hero() {
  return (
    <div className="support-main">
      <div className="container">
        <div className="row ">
          <div className="col">
            <h4 className="p-5">
              <a href="" style={{ color: "#fff" }}>
                Support portal
              </a>
            </h4>
            <h3 className="px-5 fs-4" style={{fontWeight: "400"}}>
              Search for an answer or browse help topics to create a ticket
            </h3>
            <div className="row mt-5" style={{ paddingLeft: "10%" }}>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "98%",
                  marginLeft: "",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Eg: hoe do I activate F&O, why is my order getting rejected..."
                  inputProps={{
                    "aria-label":
                      "Eg: hoe do I activate F&O, why is my order getting rejected...",
                  }}
                  style={{ padding: "10px" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
            <div className="support-links-top">
              <div className="">
                <a href="">Track account opening</a>
              </div>
              <div className="">
                <a href="">Track segment activation</a>
              </div>
              <div className="">
                <a href="">Intraday margins </a>
              </div>
              <div className="">
                <a href="">Kite user manual</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row p-5 track-ticket" style={{ display: "flex" }}>
              <div className="track-ticket-sub">
                <a
                  href=""
                  style={{
                    fontSize: "18px",
                    color: "white",
                    textDecoration: "underline",
                    justifySelf: "flex-end",
                  }}
                >
                  Track tickets
                </a>
              </div>
            </div>
            <div className="row p-5 pt-4 pb-0">
              <h3>Featured</h3>
            </div>
            <div className="row" style={{ paddingLeft: "18%" }}>
              <ol className="">
                <li className="pb-3 pt-3">
                  <a
                    href=""
                    style={{
                      fontSize: "18px",
                      color: "white",
                      textDecoration: "underline",
                    }}
                  >
                    Offer for sale (OFS) - January 2025
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    style={{
                      fontSize: "18px",
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
