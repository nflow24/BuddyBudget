import { useState } from "react";
import "../App.css";
import "./CharacterCustomization.css";
import buddyLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      return;
    }
    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);
    if (result) {
      const hasCompletedOnboarding = result.character?.skin && result.hasConnectedBank;
      navigate(hasCompletedOnboarding ? "/home" : "/customize");
    }
  };

  const handleChange = (setter) => (e) => {
    clearError();
    setter(e.target.value);
  };

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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={handleChange(setEmail)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={handleChange(setPassword)}
                required
              />
            </div>

            <p className="forgot-password">Forgot Password?</p>

            {error && <p className="error-text">{error}</p>}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Log In"}
            </button>
          </form>

          <p className="login-link">
            Don&apos;t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
