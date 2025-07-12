import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1 className="logo">FoodMania</h1>
          <p>
            FoodMania is your go-to destination for delicious food delivered
            right to your doorstep. We offer a wide variety of cuisines to
            satisfy every craving. Whether you're in the mood for a quick snack
            or a full meal, we've got you covered. Our mission is to bring the
            best food experience to your home with just a few clicks.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.linkedin.com/in/tusharrohilla11/" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn Profile"/>
            </a>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+919999999999</li>
            <li>tusharrohilla1121@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 © FoodMania by Tushar Rohilla - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
