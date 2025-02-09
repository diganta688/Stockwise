import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function SignupUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const SuccessMessage = location.state?.SuccessMessage;
  const phoneNumber = location.state?.mobile;
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [existsError, setExistsError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    date: new Date().toISOString(),
    phoneNumber: phoneNumber,
  });
  const [passMatch, setPassMatch] = useState(true);

  const handleCreatePassword = () => {
    setShowCreatePassword((prev) => !prev);
  };
  const handleConfirmPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "confirmPassword") {
      passwordCheck(e);
    }
  };

  const passwordCheck = (e) => {
    formData.password === e.target.value
      ? setPassMatch(true)
      : setPassMatch(false);
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.username &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      passMatch
    );
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://full-stack-stock-monitoring-tool-9qmj.onrender.com/signup/final",
        {
          ...formData,
        },
        { withCredentials: true }
      );

      const { success, message, redirectTo } = data;

      if (success) {
        window.open(redirectTo, "_blank");
        navigate('/signup', { state: { signupSuccess: true } });
      } else {
        console.error("Signup failed: ", message);
        setExistsError(message);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error,  { position: "top-right" , autoclose: 2000})
      if (error.response) {
        toast.error(error.response.data.message,  { position: "top-right" , autoclose: 2000})
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.",  { position: "top-right" , autoclose: 2000})
      } else {
        toast.error("An unexpected error occurred.",  { position: "top-right" , autoclose: 2000})
      }
    }

    setFormData({
      ...formData,
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      date: new Date().toISOString(),
      phoneNumber: phoneNumber,
    });
  };
useEffect(()=>{
  toast.success("Don't refresh or tab any other, just fill up the details", { position: "top-right" , autoclose: 2000})
  if(!SuccessMessage){
    navigate("/signup");
  }
},[]);
  return (
    <>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
      </div>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <div className="row p-5" style={{ justifyContent: "center" }}>
            <div className="col-5">
              <div className="row m-4">
                <h4>Fill up your personal details</h4>
              </div>
              <div className="row m-4">
                <TextField
                  id="outlined-basic-name"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="row m-4">
                <TextField
                  id="outlined-basic-username"
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="row m-4">
                <TextField
                  type="email"
                  id="outlined-basic-email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="row m-4">
                <TextField
                  id="outlined-read-only-input"
                  label="Phone"
                  value={"+91"+phoneNumber}
                  readOnly
                  name="phone"
                  onChange={handleChange}
                />
              </div>
              <div className="row m-4">
                <TextField
                  id="password"
                  label="Create Password"
                  variant="outlined"
                  type={showCreatePassword ? "text" : "password"}
                  fullWidth
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleCreatePassword} edge="end">
                          {showCreatePassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="row" style={{ margin: "24px 24px 0 24px" }}>
                <TextField
                  id="confirm-password"
                  label="Confirm Password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleConfirmPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {!passMatch && (
                <p className="mx-4 text-danger small">Password doesn't match</p>
              )}
              <div className="row m-4">
                {isSubmitting ? (
                  <Button
                    disabled={!isFormValid()}
                    variant="contained"
                    type="submit"
                  >
                    Loading...
                  </Button>
                ) : (
                  <Button
                    disabled={!isFormValid()}
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupUser;
