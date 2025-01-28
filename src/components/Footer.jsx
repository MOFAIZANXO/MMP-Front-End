// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaCheckCircle, FaUsers, FaChartBar } from 'react-icons/fa'; // Importing icons
import logo from "../assets/images/logo.png";
import "../stylesheets/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo and Contact */}
        <div className="footer-left">
          <img src={logo} alt="MMP Logo" className="footer-logo" />
          <h3>MMP</h3>
          <p className="footer-contact">
            <a href="tel:1234567890" className="footer-link">
              (123) 456–7890
            </a>
          </p>
          <p className="footer-contact">
            <a href="mailto:MMP@gmail.com" className="footer-link">
              MMP@gmail.com
            </a>
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com/" aria-label="Facebook" className="footer-icon">
              <FaFacebookF />
            </a>
            <a href="https://x.com/i/flow/login" aria-label="Twitter" className="footer-icon">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/accounts/login/?hl=en" aria-label="Instagram" className="footer-icon">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Middle Section: Product Links with Icons */}
        <div className="footer-section">
          <h4 className="footer-heading">Product</h4>
          <p className="footer-description">
            MMP Dedicated to connecting the right people with the right homes. Excellence in property management, every step of the way.
          </p>
        </div>

        {/* Right Section: Explore Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Resources</a></li>
            <li><a href="#" className="footer-link">Blog</a></li>
            <li><a href="#" className="footer-link">Documents</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
