import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const email = location.state?.email;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: email,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [forgetPassOtpSent, setforgetPassOtpSent] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();
  let SuccessMessage = location.state?.SuccessMessage;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const isFormValid = () => {
    return formData.username && formData.password;
  };
  useEffect(() => {
    toast.success("verified email please login", {
      position: "top-right",
      autoclose: 2000,
    });
    if (!SuccessMessage) {
      navigate("/signup");
    }
  }, []);
  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login/final`,
        { ...formData },
        { withCredentials: true }
      );
      const { success, message, token, redirectTo } = data;
      if (success) {
        localStorage.setItem("authToken", token);
        setIsSubmitting(false);
        window.open(redirectTo, "_blank");
        navigate("/signup");
      } else {
        toast.error("Login failed:  ", message, {
          position: "top-right",
          autoclose: 2000,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error, { position: "top-right", autoclose: 2000 });
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoclose: 2000,
        });
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.", {
          position: "top-right",
          autoclose: 2000,
        });
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };
  const emailVerification = async (e) => {
    setforgetPassOtpSent(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup/email`,
        {
          email,
        }
      );
      setforgetPassOtpSent(false);
      const { generateOTP, success, redirectTo } = response.data;
      if (redirectTo && success) {
        navigate(redirectTo, {
          state: { email, generateOTP, success, forgot: true },
        });
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (err) {
      toast.error("Error occurred while sending OTP. Please try again.");
      setforgetPassOtpSent(false);
    }
  };
  return (
    <>
      <div className="container p-3 p-md-5">
        <div className="row">
          <h2 className="text-center mb-4" style={{ padding: "20px 0" }}>
            Hey, Welcome Back
          </h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <form
              method="post"
              style={{ width: "100%", maxWidth: "100%" }}
              onSubmit={handleSubmit}
            >
              <div className="row mb-3">
                <TextField
                  id="outlined-basic"
                  label="UserName"
                  name="username"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.username}
                  fullWidth
                />
              </div>
              <div className="row mb-3">
                <TextField
                  id="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  onChange={handleChange}
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="row">
                <TextField
                  id="outlined-read-only-input"
                  label="Email address"
                  value={email}
                  readOnly
                  name="email"
                  fullWidth
                />
              </div>
              <p
                className="text-end m-0"
                style={{ display: "block", cursor: "pointer", color: "blue" }}
                onClick={emailVerification}
              >
                <small>
                  {forgetPassOtpSent ? "Loading..." : "Forgot Password?"}
                </small>
              </p>
              <div className="row">
                {isSubmitting ? (
                  <Button
                    type="submit"
                    disabled={!isFormValid()}
                    variant="contained"
                    fullWidth
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!isFormValid()}
                    variant="contained"
                    fullWidth
                  >
                    Login
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        @media (max-width: 576px) {
          h2 {
            font-size: 1.25rem;
            padding: 10px 0;
          }
          .container {
            padding: 10px;
          }
        }

        @media (min-width: 577px) and (max-width: 768px) {
          h2 {
            font-size: 1.5rem;
            padding: 15px 0;
          }
        }

        @media (min-width: 769px) {
          h2 {
            font-size: 2rem;
            padding: 50px 100px;
          }
        }
      `}</style>
    </>
  );
}

export default Login;
