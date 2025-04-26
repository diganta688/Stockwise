import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const otpValid = useRef(location.state?.generateOTP);
  const SuccessMessage = useRef(location.state?.success);
  const [otpSent, setOtpSend] = useState(false);

  useEffect(() => {
    if (!SuccessMessage.current) {
      navigate("/signup");
    }
  }, []);

  const handleOtp = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const sendOtp = async () => {
    try {
      setError("");
      setResendSuccess("");
      setOtpSend(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup/email`,
        {
          email,
        }
      );
      setOtpSend(false);
      const { generateOTP } = response.data;
      otpValid.current = generateOTP;
      setResendSuccess("A new OTP has been sent to your Email address.");
    } catch (err) {
      setOtpSend(false);
      toast.error("Error occurred while resending OTP. Please try again.", {
        position: "top-right",
        autoclose: 2000,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtpSend(true);
    setError("");
    if (otp === otpValid.current) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/email-verification`,
          {
            email
          }
        );
        setOtpSend(false);
        if (response.data.redirectTo) {
          navigate(response.data.redirectTo, {
            state: {email, SuccessMessage },
          });
        } else {
          setOtpSend(false);
          setError("Unexpected response from server.");
        }
      } catch (err) {
        setOtpSend(false);
        setError("Error occurred during OTP verification. Please try again.");
        console.error(err);
      }
    } else {
      setOtpSend(false);
      setError("The OTP you entered is incorrect. Please try again.");
    }
  };

  useEffect(()=>{
    toast.success(`otp send to ${email}`);
  },[]);

  return (
    <div className="d-flex justify-content-center align-items-center bg-light ">
      <div
        className="card shadow-sm p-4 m-5"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <form onSubmit={handleSubmit}>
          <p className="text-center mb-4">
            An OTP has been sent to your email <b>{email}</b>
          </p>
          <TextField
            id="outlined-number"
            label="Enter OTP"
            type="text"
            value={otp}
            onChange={handleOtp}
            fullWidth
            inputProps={{
              maxLength: 6,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            margin="normal"
          />
          <p className="text-center small mb-2">
            Didn't receive the OTP?{" "}
            <a
              onClick={sendOtp}
              style={{
                cursor: "pointer",
                color: "#0d6efd",
                textDecoration: "underline",
              }}
            >
              Click here
            </a>{" "}
            to resend it.
          </p>

          {resendSuccess && (
            <p className="text-success text-center small">{resendSuccess}</p>
          )}
          {error && <p className="text-danger text-center small">{error}</p>}
          <div className="d-flex justify-content-center mt-3">
            {otpSent ? (
              <button
                type="submit"
                className="btn bg-black w-100"
                disabled
                style={{ color: "white" }}
              >
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="btn bg-black w-100"
                style={{ color: "white" }}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
