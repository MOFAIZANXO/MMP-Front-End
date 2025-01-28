import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../stylesheets/login.css";

// Import the functions from user.js
import { validateUser } from "../../datasets/user"; 

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleBackClick = () => {
        window.history.back();
    };

    const handleForgotPassword = () => {
        alert("Redirecting to Forgot Password Page...");
    };

    const handleLogin = () => {
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Validate the user credentials
        const user = validateUser(email, password);

        if (user) {
            const { userType } = user; // Extract the user type

            if (userType === "renter") {
                navigate("/renter");
            } else if (userType === "owner") {
                navigate("/owner");
            } else {
                alert("Invalid user type.");
            }
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className="signup-container">
            <div className="backBtn" onClick={handleBackClick}>
                <FontAwesomeIcon icon={faArrowLeft} className="back-btn" />
            </div>
            <div className="login">
                <img src={logo} alt="Logo" className="logoImg" />
                <p className="login-head">Login</p>

                <p className="login-text">Your Email:</p>
                <input
                    type="email"
                    placeholder="you@example.com"
                    className="input-box"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <p className="login-text">Your Passcode:</p>
                <input
                    type="password"
                    placeholder="Passcode"
                    className="input-box"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="remember-forgot-container">
                    <label className="checkbox-label">
                        <input type="checkbox" className="checkbox" /> Remember me?
                    </label>
                    <button className="forgot-password" onClick={handleForgotPassword}>
                        Forgot Password?
                    </button>
                </div>

                <button className="loginBtn" onClick={handleLogin}>
                    Login
                </button>
                <p>Don't have an account?</p>
                <Link to="/signup" className="signup-link">
                    <button className="signupBtn">
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    );
}
