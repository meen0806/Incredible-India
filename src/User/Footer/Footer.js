import React from "react";
import { Email, Phone } from "@mui/icons-material";
import "../Footer/Footer.css";


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        {/* Logo/Title Section */}
        <div className="footer-section footer-logo">
          <h4>Trouble</h4>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h6>Quick Links</h6>
          <ul>
            <li>› About Us</li>
            <li>› Why Travel with us</li>
            <li>› Contact Us</li>
          </ul>
        </div>

        {/* Categories Section */}
        <div className="footer-section">
          <h6>Categories</h6>
          <ul>
            <li>› Adventure</li>
            <li>› Family Tour</li>
            <li>› Wild Life Tour</li>
            <li>› Polar Tour</li>
            <li>› Food Tour</li>
          </ul>
        </div>

        {/* Destination Section */}
        <div className="footer-section">
          <h6>Destination</h6>
          <ul>
            <li>› African Safaris</li>
            <li>› North India</li>
            <li>› South India</li>
            <li>› West Bengal</li>
            <li>› Kolkata</li>
            <li>› Mumbai Beach</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="footer-section footer-contact">
          <h6>Contact Us</h6>
          <p>
            205, NRK Biz Park, PU4 <br />
            Vijay Nagar, Indore 452010, India
          </p>
          <p>
            <Email className="footer-icon" /> goldeneagle@gmail.com
          </p>
          <p>
            <Phone className="footer-icon" /> +91 8359847330
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
