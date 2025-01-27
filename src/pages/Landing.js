import { Link } from "react-router-dom";
import Footer from '../components/Footer'; // Adjust path if necessary
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

      {/* About Section */}
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

      {/*Portals Section (except admin and vendor) */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-item">
            <img
              src="https://media.istockphoto.com/id/1294492188/video/slow-pan-of-beautiful-custom-home-and-for-rent-real-estate-sign.jpg?s=640x640&k=20&c=RKac7HEnbbOKbAU57yHnTR8aJlrxCQhfJVeC1U6GuTM="
              alt="Feature 1"
              className="feature-icon"
            />
            <h3>Looking for a place to rent?</h3>
            <p>Sign up today as a renter and discover the perfect place to call home. Let us help you find your ideal property, hassle-free!</p>
            <Link to="/renter">
              <button className="button">Sign Up as Renter</button> {/* Navigate to Renter Portal */}
            </Link>
          </div>
          <div className="feature-item">
            <img
              src="https://media.istockphoto.com/id/1184243297/vector/real-estate-concept-buy-house-poster-with-men-hands-paying-money-for-the-home-building.jpg?s=612x612&w=0&k=20&c=PSLYN4VhHpjMkpn8OsKigEI5nzmQIhxwbH1nxvvUbtM="
              alt="owner"
              className="feature-icon"
            />
            <h3>Worried about your property?</h3>
            <p>Sign up and connect with our dedicated property manager today. Managers will handle your rent problems starting today!</p>
            <Link to="/Owner">
              <button className="button">Get a Property Manager</button> {/* Navigate to Property Manager Portal */}
            </Link>
          </div>
          <div className="feature-item">
            <img
              src="https://media.istockphoto.com/id/1184243290/vector/real-estate-concept-buy-house-poster-vector-illustration.jpg?s=612x612&w=0&k=20&c=bp9zkxoi1lN4WSKJjsMpaVYm5Zz4dBrjCUZGgkzB2aw="
              alt="Feature 3"
              className="feature-icon"
            />
            <h3>Become a Property Manager Today!</h3>
            <p>Sign up today as a property manager. Helping both renters and owners in their property related endeavors. Today!</p>
            <Link to="/property-manager">
              <button className="button">Sign Up as Manager</button> {/* Navigate to Property Manager Portal */}
            </Link>
          </div>
        </div>
      </section>

      {/* Vendor Section */}
      <section className="vendor-section">
        <div className="vendor-text">
          <h2>Become a Vendor</h2>
          <p>Join our team and start earning by providing top-notch services. Connect with property managers and handle work orders with ease.</p>
          <p>With our platform, gain access to numerous opportunities, build a trusted network, and grow your business efficiently.</p>
          <a href="/Vendor" className="button">Become a Vendor</a>
        </div>
        <div className="vendor-image">
          <img 
            src="https://media.istockphoto.com/id/823328086/photo/new-roof-installation.jpg?s=612x612&w=0&k=20&c=bbsfNLdLXy_yIOd0EtKNXiaLUdXjTgOhTFRmmdITYQc="
            alt="Vendor"
            className="rounded"
          />
        </div>
      </section>

       {/* Footer */}
       <Footer />

    </div>
  );
}

export default Landing;
