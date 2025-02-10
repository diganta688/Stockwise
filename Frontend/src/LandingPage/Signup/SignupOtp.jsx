import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.mobile;
  const otpValid = useRef(location.state?.generateOTP);
  const SuccessMessage = useRef(location.state?.success);

  useEffect(()=>{
    if(!SuccessMessage.current){
      navigate("/signup");
    }    
  },[])

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup/mobile`, {
        phoneNumber: "+91" + phone,
      });
      const { generateOTP } = response.data;
      otpValid.current = generateOTP;
      setResendSuccess("A new OTP has been sent to your mobile number.");
    } catch (err) {
      toast.error("Error occurred while resending OTP. Please try again.", { position: "top-right" , autoclose: 2000})
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === otpValid.current) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/mobile-verification`,
          {
            phoneNumber: phone,
          }
        );
        if (response.data.redirectTo) {
          navigate(response.data.redirectTo, { state: { mobile: phone, SuccessMessage } });
        } else {
          setError("Unexpected response from server.");
        }
      } catch (err) {
        setError("Error occurred during OTP verification. Please try again.");
        console.error(err);
      }
    } else {
      setError("The OTP you entered is incorrect. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-4">
            <form onSubmit={handleSubmit}>
              <p>
                An OTP has been sent to <b>+91{phone}</b>
              </p>
              <TextField
                id="outlined-number"
                label="Enter OTP"
                type="text"
                value={otp}
                onChange={handleOtp}
                inputProps={{
                  maxLength: 6,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <p style={{ fontSize: "12px" }}>
                Didn't receive the OTP?{" "}
                <a
                  onClick={sendOtp}
                  style={{ cursor: "pointer", color: "#0d6efd" }}
                >
                  Click here
                </a>{" "}
                to resend it.
              </p>
              {resendSuccess && (
                <div>
                  <p className="text-success small">{resendSuccess}</p>
                </div>
              )}
              {error && (
                <div>
                  <p className="text-danger small">{error}</p>
                </div>
              )}
              <button
                type="submit"
                style={{
                  width: "80%",
                  justifySelf: "center",
                  marginBottom: "20px",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
