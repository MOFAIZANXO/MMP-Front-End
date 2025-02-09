import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; 
import { useState } from "react";
import { saveUserData, getUserData } from "../../datasets/user";
import "../../stylesheets/signup.css";

export default function SignUp() {
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false); 
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false); 
    const navigate = useNavigate();

    const handleCheckboxChange = (type) => {
        setSelectedUserType(type === selectedUserType ? null : type);
    };

    const handleSignUp = () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!selectedUserType) {
            alert("Please select a user type.");
            return;
        }

        const users = getUserData();
        if (users.find((user) => user.email === email)) {
            alert("This email is already registered.");
            return;
        }

        saveUserData({
            firstName,
            lastName,
            email,
            password,
            userType: selectedUserType,
        });

        alert("Signup successful!");
        navigate("/login");
    };

    return (
        <div className="signup-container">
            <div className="backBtn" onClick={() => {navigate("/")}}>
                <FontAwesomeIcon icon={faArrowLeft} className="back-btn" />
            </div>
            <div className="signUp">
                <img src={logo} alt="Logo" className="logoImg" />
                <p className="signup-head">Sign Up</p>
                <p className="signup-subhead">Let's get you signed up</p>

                <div className="name-container">
                    <input
                        type="text"
                        placeholder="First Name"
                        className="firstname-box"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="lastname-box"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <input
                    type="email"
                    placeholder="you@example.com"
                    className="input-box"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="password-container">
                    <div className="input-with-icon">
                        <input
                            type={passwordVisibility ? "text" : "password"}
                            placeholder="Passcode"
                            className="input-box-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={passwordVisibility ? faEye : faEyeSlash}
                            className="eye-icon"
                            onClick={() => setPasswordVisibility(!passwordVisibility)}
                        />
                    </div>
                </div>

                <div className="password-container">
                    <div className="input-with-icon">
                        <input
                            type={confirmPasswordVisibility ? "text" : "password"}
                            placeholder="Confirm Passcode"
                            className="input-box-1"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={confirmPasswordVisibility ? faEye : faEyeSlash}
                            className="eye-icon"
                            onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}
                        />
                    </div>
                </div>

                <div className="checkbox-container">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={selectedUserType === "owner"}
                            onChange={() => handleCheckboxChange("owner")}
                        />{" "}
                        &nbsp;&nbsp;Owner
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={selectedUserType === "renter"}
                            onChange={() => handleCheckboxChange("renter")}
                        />{" "}
                        &nbsp;&nbsp;Renter
                    </label>
                </div>

                <div className="button-container">
                    <button className="signup-button" onClick={handleSignUp}>
                        Sign Up
                    </button>
                    <Link to="/login" className="login-button-text">
                        <button className="login-button">
                            Already have an account?
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
