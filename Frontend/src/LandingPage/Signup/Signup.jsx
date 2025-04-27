import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorOtp, setErrorOtp] = useState("");
  const [isContinue, setIsContinue] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
      setIsContinue(false);
    } else {
      setError("");
      setIsContinue(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsContinue(false);
    setOtpSent(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup/email`,
        {
          email: email,
        }
      );
      setOtpSent(false);
      const { generateOTP, success, redirectTo } = response.data;
      if (redirectTo && success) {
        navigate(redirectTo, {
          state: { email, generateOTP, success },
        });
      } else {
        setError("Unexpected response from server");
        setIsContinue(true);
      }
    } catch (err) {
      setError("Error occurred while signing up. Please try again.");
      setErrorOtp("OTP can be received only by verified email addresses. If you're facing issues,");
      setOtpSent(false);
      setIsContinue(true);
    }
  };

  const emailVerification = async () => {
    setOtpSent(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/email-verification`,
        { email }
      );
      if (response.data.redirectTo) {
        navigate(response.data.redirectTo, {
          state: { email, SuccessMessage: true },
        });
      } else {
        setError("Unexpected response from server");
      }
    } catch (err) {
      setError("Error occurred while signing up. Please try again.");
    } finally {
      setOtpSent(false);
    }
  };

  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-8 signup-col" style={{ margin: "0 auto" }}>
          <img
            src="media/Images/signup.png"
            alt="Signup Illustration"
            className="signup-image"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col d-flex flex-column justify-content-center" style={{ minWidth: "264px" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-2 px-2">
              <h2>Verify Email Address</h2>
            </div>
            <div className="text-muted px-2">
              <p>Or track your existing application.</p>
            </div>
            <div className="mb-3">
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-email">Enter your email address</InputLabel>
                <OutlinedInput
                  type="email"
                  id="outlined-adornment-email"
                  value={email}
                  onChange={handleInputChange}
                  label="Enter your email address"
                />
              </FormControl>
              {error && <p className="text-danger small m-0 mx-3">{error}</p>}
            </div>
            <div className="text-muted px-2">
              {errorOtp ? (
                <p className="text-danger small">
                  {errorOtp}&nbsp;
                  {otpSent ? (
                    <span style={{ color: "#0d6efd" }}>Loading...</span>
                  ) : (
                    <a style={{ cursor: "pointer", color: "#0d6efd" }} onClick={emailVerification}>
                      Login Here
                    </a>
                  )}
                </p>
              ) : (
                <p>You will receive an OTP on your email</p>
              )}
            </div>
            <div className="px-2 mb-2">
              <button type="submit" className="btn btn-primary" disabled={!isContinue || otpSent}>
                {otpSent ? "Loading..." : "Continue"}
              </button>
            </div>
            <div className="px-2" style={{ fontSize: "12px" }}>
              <a href="/">
                <p>Want to open an NRI account?</p>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="row text-center">
        <p className="disclaimer">
          I authorise StockWISE to contact me even if my email is registered for DND. I authorise StockWISE to fetch my KYC information from the
          C-KYC registry with my PAN. Please visit <a href="/">this article</a> to know more. By submitting your contact details, you authorize
          StockWISE to contact you & conduct online KYC for trading & demat account opening as per KRA regulations and PMLA guidelines. If you are
          looking to open a HUF, Corporate, Partnership, or NRI account, you have to use the <a href="/">offline forms</a>. For help,{" "}
          <a href="/">click here</a>.
        </p>
      </div>
    </div>
  );
}

export default Signup;
