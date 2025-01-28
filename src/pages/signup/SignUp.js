import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { saveUserData, getUserData } from '../../datasets/user'; 
import "../../stylesheets/signup.css";

export default function SignUp() {
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCheckboxChange = (type) => {
        setSelectedUserType(type === selectedUserType ? null : type);
    };

    const handleBackClick = () => {
        window.history.back();
    };

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        saveUserData({
            firstName,
            lastName,
            email,
            password,
            userType: selectedUserType,
        });

        console.log("All users:", getUserData());

        alert("Signup successful!");
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSelectedUserType(null);
    };

    return (
        <div className="signup-container">
            <div className="backBtn" onClick={handleBackClick}>
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

                <input 
                    type="password" 
                    placeholder="Passcode" 
                    className="input-box" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <input 
                    type="password" 
                    placeholder="Confirm Passcode" 
                    className="input-box" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />

                <div className="checkbox-container">
                    <label className="checkbox-label">
                        <input 
                            type="checkbox" 
                            className="checkbox" 
                            checked={selectedUserType === 'owner'} 
                            onChange={() => handleCheckboxChange('owner')} 
                        /> &nbsp;&nbsp;Owner
                    </label>
                    <label className="checkbox-label">
                        <input 
                            type="checkbox" 
                            className="checkbox" 
                            checked={selectedUserType === 'renter'} 
                            onChange={() => handleCheckboxChange('renter')} 
                        /> &nbsp;&nbsp;Renter
                    </label>
                </div>

                <div className="button-container">
                    <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
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
