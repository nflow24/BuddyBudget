import "../App.css";
import buddyLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function SignUp() {

  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="phone-container">

        <div className="top-section"></div>

        <div className="main-content signup-content">

          <h1 className="signup-title">Create An Account</h1>

          {/* LOGIN LINK */}
          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>

          <div className="logo-box">
            <img src={buddyLogo} className="logo-image signup-logo" />
          </div>

          <input
            type="text"
            placeholder="Name"
            className="input-field"
          />

          <input
            type="email"
            placeholder="Email"
            className="input-field"
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />

          <input
            type="date"
            className="input-field"
          />

          <button className="signup-btn" onClick={() => navigate("/login")}>
            →
          </button>

        </div>
      </div>
    </div>
  );
}

export default SignUp;