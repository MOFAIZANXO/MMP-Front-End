import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
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
          <li>
            <NavLink
              to="/renter"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/agents"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Agents
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/renterprofile"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Profile
            </NavLink>
          </li>
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