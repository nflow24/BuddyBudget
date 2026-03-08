import { Outlet } from "react-router-dom";
import "../App.css";
import BottomNav from "../components/BottomNav";
import "./AppPages.css";

function InsideAppLayout() {
  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="cc-card">
          <Outlet />
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default InsideAppLayout;