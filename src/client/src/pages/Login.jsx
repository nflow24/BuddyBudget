import "../App.css";
import buddyLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="phone-container">
        <div className="top-section login-top-section">
          <button className="back-btn" onClick={() => navigate("/")}>
            ×
          </button>
        </div>

        <div className="main-content login-content">
          <div className="logo-box">
            <img
              src={buddyLogo}
              alt="BuddyBudget Logo"
              className="logo-image login-logo"
            />
          </div>

          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue your budget journey.</p>

          <div className="form-group">
            <input type="email" placeholder="Email" className="input-field" />
          </div>

          <div className="form-group">
            <input type="password" placeholder="Password" className="input-field" />
          </div>

          <p className="forgot-password">Forgot Password?</p>

          <button className="login-btn" onClick={() => navigate("/customize")}>Log In</button>

          <p className="login-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;