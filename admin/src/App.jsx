import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
// import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  
<<<<<<< HEAD
  // const url = "http://localhost:8000";
  const url = "https://food-mania-backend-livid.vercel.app"; // Remove trailing slash
=======
  const url = "https://food-mania-backend-livid.vercel.app";
>>>>>>> 87b35c250d6269f488f5d145e9a1c9f28768aaa6

  // axios.defaults.baseURL = ;

  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />

        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
