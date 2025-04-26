import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import { uidContext } from "../Content/context";
import axios from "axios";
import { ToastContainer, Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const { id } = useParams();
  const [display, setDisplay] = useState(false);
    useEffect(() => {
    if (!id) {
      window.location.href = `${import.meta.env.VITE_API_URL_FRONTEND}/signup`;
      return;
    }
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setDisplay(true);
      }
    } catch (error) {
      if (
        error.response?.status === 401 || 
        error.response?.status === 404
      ) {
        window.location.href = `${import.meta.env.VITE_API_URL_FRONTEND}/signup`;
      } else {
        toast.error("Something went wrong. User not found.");
      }
    }
  };
  
  if (!display) {
    return <div>Loading...</div>;
  }
  
  return (
    <uidContext.Provider value={{ uId: id }}>
      {display && (
        <Alert severity="warning">
          Here, you can analyze a stock. Buying and selling are dynamic as of
          now. All transactions—buying and selling—should function like real
          ones. However, the money you are using is not real.
        </Alert>
      )}
      <div className="container-fluid p-0">
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
        <TopBar />
        <Dashboard />
      </div>
    </uidContext.Provider>
  );
}

export default Home;
