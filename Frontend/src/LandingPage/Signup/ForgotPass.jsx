import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPass = ({email}) => {
    const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetLoader, setResetLoader] = useState(false);
  const [passError, setPassError] = useState("");

  const passCheck = (value) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(value)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPassError(passCheck(value));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResetLoader(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/reset-password`,
        {
          email,
          password: password,
        }
      );

      const { success, message, redirectTo } = response.data;

      if (success) {
        toast.success(message);
        navigate(redirectTo || "/login", { state: { email, SuccessMessage: true } });
    } else {
        toast.error(message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error(
        error?.response?.data?.message ||
          "Error occurred while resetting password. Please try again."
      );
    } finally {
      setResetLoader(false);
    }
  };

  const isSubmitDisabled =
    passError ||
    password !== confirmPassword ||
    !password ||
    !confirmPassword ||
    resetLoader;

  return (
    <div
      className="container"
      style={{ maxWidth: "450px", margin: "0 auto", padding: "2rem 1rem" }}
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Reset Password</h2>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="password">New Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            label="New Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {passError && <p className="text-danger small m-0">{passError}</p>}
        <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          className="mt-2"
        >
          <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            label="Confirm Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {confirmPassword && password !== confirmPassword && (
          <p className="text-danger small m-0">Passwords do not match</p>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          disabled={isSubmitDisabled}
          style={{ marginTop: "1rem" }}
        >
          {resetLoader ? "Loading..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPass;
