import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <a href="/">
          <h2 className="logo">FoodMania</h2>
          <span className="admin">Admin Panel</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
