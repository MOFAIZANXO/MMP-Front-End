import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; // Ensure this path is correct
import "../stylesheets/landing_Style.css";

function Landing() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          {/* Logo and Title */}
          <div className="logo-title">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="navbar-title">Manage My Property</h1>
          </div>

          {/* Sign Up Button */}
          <div className="signup-btn-container">
            <Link to="/signup" className="signup-btn">
              SIGN UP
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Text Section */}
          <div className="hero-text">
            <h1>Welcome to Manage My Property</h1>
            <p>
              Find Your Perfect Home, Reliable Renters, or Expert Property Management
              – All in One Place!
            </p>
          </div>

          {/* Image Section */}
          <div className="hero-image">
            <img
              src="https://media.istockphoto.com/id/1284635683/photo/red-and-gray-row-houses-in-suburbia.jpg?s=1024x1024&w=is&k=20&c=_3V32TCEN6Ih5OxNeAQ89_tx_Vub60-3dn1FeCbd3G4="
              alt="Beautiful houses"
              className="rounded"
            />
          </div>
        </div>
      </section>

      <section className="about-section">
      {/* Image Section */}
      <div className="about-image">
        <img
          src="https://plus.unsplash.com/premium_photo-1682309788947-606b23185331?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Property illustration"
        />
      </div>

      {/* Text Section */}
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            Welcome to <strong style={{ color: "#ff4d4d" }}>Manage My Property</strong>, your trusted partner in
            property rental and management. We specialize in connecting property
            owners with reliable tenants and providing seamless property management
            solutions tailored to your needs.
          </p>
        </div>
      </section>
    


      {/* Landing Page Content */}
      <div className="nav-buttons">
        <Link to="/admin" className="nav-button">Admin Portal</Link>
        <Link to="/property-manager" className="nav-button">Property Manager Portal</Link>
        <Link to="/owner" className="nav-button">Owner Portal</Link>
        <Link to="/renter" className="nav-button">Renter Portal</Link>
        <Link to="/vendor" className="nav-button">Vendor Portal</Link>
      </div>
    </div>
  );
}

export default Landing;
