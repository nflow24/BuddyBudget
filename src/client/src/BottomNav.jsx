import { useNavigate, useLocation } from "react-router-dom";
import "./BottomNav.css";

import leaderboardIcon from "./assets/nav/leaderboard.svg";
import moneyIcon from "./assets/nav/money.svg";
import homeIcon from "./assets/nav/home.svg";
import friendsIcon from "./assets/nav/friend.svg";
import profileIcon from "./assets/nav/icon.svg";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/leaderboard", icon: leaderboardIcon, label: "Leaderboard" },
    { path: "/money", icon: moneyIcon, label: "Money" },
    { path: "/home", icon: homeIcon, label: "Home" },
    { path: "/friends", icon: friendsIcon, label: "Friends" },
    { path: "/me", icon: profileIcon, label: "Me" },
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
        <img src={item.icon} alt={item.label} className="nav-icon-image" />
        </button>
    );
    })}
    </div>
  );
}

export default BottomNav;