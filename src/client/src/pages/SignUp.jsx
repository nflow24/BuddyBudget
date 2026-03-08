import { useState } from "react";
import "../App.css";
import buddyLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { signup, error, clearError } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }
    setLoading(true);
    const success = await signup(name.trim(), email.trim(), password.trim(), dob || undefined);
    setLoading(false);
    if (success) {
      navigate("/customize");
    }
  };

  const handleChange = (setter) => (e) => {
    clearError();
    setter(e.target.value);
  };

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

          <div
            className="logo-box logo-box--clickable"
            onClick={() => navigate("/")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
            aria-label="Return to home"
          >
            <img src={buddyLogo} alt="BuddyBudget Logo" className="logo-image signup-logo" />
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              placeholder="Name"
              className="input-field"
              value={name}
              onChange={handleChange(setName)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={handleChange(setEmail)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={handleChange(setPassword)}
              required
            />

            <input
              type="date"
              className="input-field"
              value={dob}
              onChange={handleChange(setDob)}
            />

            {error && <p className="error-text">{error}</p>}

            <button
              type="submit"
              className="signup-btn"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
