import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import "./index.css";

const RedirectToDashboard = () => {
  const defaultId = "123"; 
  return <Navigate to={`/dashboard/${defaultId}`} replace />;
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RedirectToDashboard />} />
      <Route path="/dashboard/:id/*" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);