import { useNavigate, useLocation } from "react-router-dom";
import "./BottomNav.css";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
const navItems = [
  { path: "/leaderboard", icon: "📊", label: "Leaderboard" },
  { path: "/money", icon: "$", label: "Money" },
  { path: "/home", icon: "🏠", label: "Home" },
  { path: "/friends", icon: "👥", label: "Friends" },
  { path: "/me", icon: "👤", label: "Me" }
];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.path ||
          (item.path === "/me" && location.pathname === "/monthly-savings");

        return (
          <button
            key={item.path}
            className={`nav-btn ${isActive ? "active" : ""}`}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
          </button>
        );
      })}
    </div>
  );
}

export default BottomNav;