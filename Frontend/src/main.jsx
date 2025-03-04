import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./LandingPage/Home/HomePage";
import AboutPage from "./LandingPage/About/AboutPage";
import PricingPage from "./LandingPage/Pricing/PricingPage";
import ProductPage from "./LandingPage/Product/ProductPage";
import Signup from "./LandingPage/Signup/Signup";
import SuppportPage from "./LandingPage/Support/SuppportPage";
import Navbar from "./LandingPage/Navbar";
import Footer from "./LandingPage/Footer";
import NotFound from "./LandingPage/NotFound";
import ScrollToTop from "./LandingPage/ScrollToTop";
import Login from "./LandingPage/Signup/Login";
import SignupUser from "./LandingPage/Signup/SignupUser";
import SignupOtp from "./LandingPage/Signup/SignupOtp";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={5}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Flip}
    />
    <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/price" element={<PricingPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup/user-details" element={<SignupUser />} />
      <Route path="/support" element={<SuppportPage />} />
      <Route path="/otp-verification" element={<SignupOtp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
