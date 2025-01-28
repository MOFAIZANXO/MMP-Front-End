import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../../stylesheets/login.css";

export default function Login() {
    const handleForgotPassword = () => {
        alert('Redirect to Forgot Password Page');
    };

    return (
        <div className="signup-container">
            <div className="backBtn">
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
                />

                <p className="login-text">Your Passcode:</p>
                <input 
                    type="password" 
                    placeholder="Passcode" 
                    className="input-box" 
                />

                <div className="remember-forgot-container">
                    <label className="checkbox-label">
                        <input 
                            type="checkbox" 
                            className="checkbox" 
                        /> Remember me?
                    </label>
                    <button className="forgot-password" onClick={handleForgotPassword}>
                        Forgot Password?
                    </button>
                </div>

                <button className="loginBtn">Login</button>
                <p>Don't have an account?</p>
                <button className="signupBtn" onClick={() => alert('Redirect to Signup Page')}>Sign Up</button>
            </div>
        </div>
    );
}
