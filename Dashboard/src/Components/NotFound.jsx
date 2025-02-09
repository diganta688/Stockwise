import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NotFound() {
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/non-exist-route")
      .then((response) => {
        console.log("Response:", response);
      })
      .catch((error) => {
        if (error.response) {
          setError({
            status: error.response.status,
            data: error.response.data || "No error message provided",
          });
        } else {
          setError({ status: 500, data: "An unexpected error occurred" });
        }
      });
  }, []); 

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center home-hero">
        {error && (
          <div>
            {error.status === 404 ? (
              <>
                <h1 className="fs-2">{error.status} Page Not Found</h1>
                <p>{typeof error.data === 'object' ? error.data.error : error.data} 
                  <Link to="/"> Zerodha’s home page</Link>
                </p>
              </>
            ) : (
              <>
                <h1 className="fs-2">500 An unexpected error occurred.</h1>
                <p><Link to="/">Zerodha’s home page</Link></p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotFound;
