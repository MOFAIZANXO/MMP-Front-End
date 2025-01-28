import React from "react";
import "../../stylesheets/Renter/Navbar.css";

function RenterNavbar() {
  return (
    <header className="renter-header fixed-header">
      <div className="header-logo">
        <img src={require("../../assets/images/logo.png")} alt="Logo" className="logo" />
        <h3>Manage My Property</h3>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/">Agents</a></li>
          <li><a href="/">Profile</a></li>
        </ul>
      </nav>
      <div className="profile-pic">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfSSmuKtBLKfGzFv1Bi23dtQWZyLgtUERRdA&s"
          alt="Profile"
          className="profile-image"
        />
      </div>
    </header>
  );
}

export default RenterNavbar;
