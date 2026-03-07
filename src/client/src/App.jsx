import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import buddyLogo from "./assets/logo.png";
import CharacterCustomization from "./pages/CharacterCustomization";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="phone-container">
        <div className="top-section">
          <div className="money money-1">$</div>
          <div className="money money-2">$</div>
          <div className="money money-3">$</div>
          <div className="money money-4">$</div>
        </div>

        <div className="main-content">
          <h2 className="welcome-text">Welcome to</h2>

          <div className="logo-box">
            <img
              src={buddyLogo}
              alt="BuddyBudget Logo"
              className="logo-image"
            />
          </div>

          <h1 className="title">
            <span className="buddy-text">Buddy</span>
            <span className="budget-text">Budget</span>
          </h1>

          <button
            className="get-started-btn"
            onClick={() => navigate("/customize")}
          >
            Get Started
          </button>

          <p className="signin-text">
            Have an account? <span>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customize" element={<CharacterCustomization />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;