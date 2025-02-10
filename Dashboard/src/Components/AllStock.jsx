import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useParams } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllStock({ refreshWatchlist }) {
  const [isValue, setIsValue] = useState(false);
  const [isSearchValue, setIsSearchValue] = useState("");
  const [stockInfo, setStockInfo] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [save, setSave] = useState(false);
  let { id } = useParams();
  const handelchange = (e) => {
    let v = e.target.value;
    setIsSearchValue(v);
  };

  const handleClick = async () => {
    try {
      let response = await axios.post(`${import.meta.env.VITE_API_URL}/search-stock`, {
        name: isSearchValue + ".NS",
      });
      if (response.status === 200) {
        let { data } = response.data;
        setNotFound(true);
        let percentage =
          ((data.regularMarketPrice - data.regularMarketPreviousClose) /
            data.regularMarketPreviousClose) *
          100;
        let percentageStr = percentage.toString();
        let [integer, decimal] = percentageStr.split(".");
        if (decimal) {
          decimal = decimal.replace(/^0+/, "");
        }
        let result = integer + (decimal ? "." + decimal : "");
        let finalResult = parseFloat(result).toFixed(2);
        let change = (
          data.regularMarketPrice - data.regularMarketPreviousClose
        ).toFixed(2);
        setStockInfo({
          name: data.symbol,
          price: data.regularMarketPrice,
          percent: finalResult,
          change: change,
          prevClose: data.regularMarketPreviousClose,
          open: data.regularMarketOpen,
        });
      }
    } catch (error) {
      toast.error(error, { position: "top-right", autoclose: 2000 });
      setNotFound(false);
    }
  };

  const handelSave = async () => {
    setSave(!save);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/addWishlist/${id}`,
        {
          data: stockInfo,
          username: stockInfo,
        }
      );
      if (response.status === 200) {
        refreshWatchlist();
        toast.success("Stock added Successfully", {
          position: "top-right",
          autoclose: 2000,
        });
      } else if (response.status === 404 || response.status === 500) {
        toast.error("Stock is already in your WishList.", {
          position: "top-right",
          autoclose: 2000,
        });
      }
      setSave(false);
    } catch (error) {
      setSave(false);
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoclose: 2000,
        });
      } else if (error.request) {
        toast.error("Error: No response from the server. Please try again.", {
          position: "top-right",
          autoclose: 2000,
        });
      } else {
        toast.error("Error: Something went wrong. Please try again.", {
          position: "top-right",
          autoclose: 2000,
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleClick();
    }, 2000);
  }, [stockInfo]);

  useEffect(() => {
    isSearchValue.length >= 1 ? setIsValue(true) : setIsValue(false);
  }, [isSearchValue]);

  return (
    <>
      <div className="container" style={{ height: "90%" }}>
        <div className="row mt-3">
          <div
            className="col"
            style={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              value={isSearchValue}
              onChange={handelchange}
              id="outlined-search"
              label="Name of the Stock"
              type="search"
              style={{ width: "100%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            {isValue && (
              <Button
                size="small"
                onClick={handleClick}
                endIcon={<SearchIcon />}
                loadingPosition="end"
                variant="contained"
              >
                Search
              </Button>
            )}
          </div>
        </div>
        <div className="row px-2 mt-3 text-center" style={{}}>
          {notFound ? (
            <div className="filtered-stock">
              <div className="">
                {save ? (
                  <BookmarkIcon
                    style={{ marginRight: "10px" }}
                    onClick={handelSave}
                  />
                ) : (
                  <BookmarkBorderIcon
                    style={{ marginRight: "10px" }}
                    onClick={handelSave}
                  />
                )}
                {stockInfo.name}
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  width: "30%",
                  justifyContent: "space-between",
                }}
              >
                <div className="">
                  <span style={{ marginRight: "5px" }}>{stockInfo.change}</span>
                  <span>({stockInfo.percent}%)</span>
                </div>
                <div className="">^</div>
                <div className="">{stockInfo.price}</div>
                <div className="">
                  <CloseIcon
                    onClick={() => {
                      setNotFound(false);
                      setIsSearchValue("");
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="mt-3"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MenuBookIcon style={{ marginRight: "10px" }} />
              No stock found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllStock;
