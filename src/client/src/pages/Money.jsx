import { useState, useEffect, useMemo } from "react";
import "../App.css";
import "./AppPages.css";
import "./CharacterCustomization.css";
import "./Money.css";
import BottomNav from "../BottomNav";
import SpendingPieChart from "../components/SpendingPieChart";
import { useAuth } from "../context/AuthContext";
import { GOAL_CATEGORIES } from "../data/goalCategories";

// Colors for chart segments (one per goal category)
const CHART_COLORS = [
  "#12c85a",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];


function buildChartDataFromGoals(actualsByCategory) {
  return GOAL_CATEGORIES.map(({ id, label }, index) => ({
    id,
    label,
    value: Math.round(Number(actualsByCategory?.[id]) || 0),
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));
}

function Money() {
  const { token } = useAuth();
  const [goals, setGoals] = useState(null);
  const [actualsByCategory, setActualsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localOverrides, setLocalOverrides] = useState({});

  useEffect(() => {
    if (!token) {
      setGoals({});
      setActualsByCategory({});
      setLoading(false);
      return;
    }
    async function syncThenFetchGoals() {
      try {
        await fetch("/api/plaid/sync-transactions", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        /* ignore sync errors */
      }
      try {
        const res = await fetch("/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setGoals(data.goals || {});
          setActualsByCategory(data.actualsByCategory || {});
        } else {
          setError(data.error || "Failed to load goals");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    syncThenFetchGoals();
  }, [token]);

  const chartData = useMemo(() => {
    const base = buildChartDataFromGoals(actualsByCategory);
    if (Object.keys(localOverrides).length === 0) return base;
    return base.map((item) =>
      item.id in localOverrides
        ? { ...item, value: localOverrides[item.id] }
        : item
    );
  }, [actualsByCategory, localOverrides]);

  const handleCategoryChange = (id, newValue) => {
    const num = Math.max(0, Math.round(Number(newValue)) || 0);
    setLocalOverrides((prev) => ({ ...prev, [id]: num }));
  };

  const [spendingHealth, setSpendingHealth] = useState(100);

  useEffect(() => {
    if (!token) {
      setSpendingHealth(100);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        await fetch("/api/plaid/sync-transactions", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch { /* ignore */ }
      try {
        const res = await fetch("/api/health", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!cancelled) {
          if (res.ok && typeof data.health === "number") {
            setSpendingHealth(Math.min(100, Math.max(0, data.health)));
          } else {
            setSpendingHealth(100);
          }
        }
      } catch {
        if (!cancelled) setSpendingHealth(100);
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  const displayHealth = useMemo(() => {
    if (spendingHealth != null && !Number.isNaN(spendingHealth)) {
      return Math.min(100, Math.max(0, spendingHealth));
    }
    if (goals && actualsByCategory) {
      const totalGoal = GOAL_CATEGORIES.reduce((s, { id }) => s + (Number(goals[id]) || 0), 0);
      const totalActual = GOAL_CATEGORIES.reduce((s, { id }) => s + (Number(actualsByCategory[id]) || 0), 0);
      if (totalGoal > 0) {
        const ratio = totalActual / totalGoal;
        return Math.min(100, Math.max(0, Math.round(ratio <= 1 ? 100 : 100 / ratio)));
      }
    }
    return 100;
  }, [spendingHealth, goals, actualsByCategory]);
  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="cc-card">
          <div className="inside-app-content dashboard-content">
            <h1 className="dashboard-title">Monthly Spending</h1>

            {loading && <p className="goals-loading">Loading…</p>}
            {error && <p className="error-text">{error}</p>}

            {!loading && !error && (
              <>
                <SpendingPieChart data={chartData} />

              </>
            )}

            <div className="dashboard-card">
              <p className="dashboard-stat-title">Spending Health</p>

              <div className="dashboard-progress-bar">
                <div
                  className="dashboard-progress-fill"
                  style={{ width: `${displayHealth}%`}}
                />
              </div>

              <p className="dashboard-muted">
                {displayHealth}% on track with your spending goals
              </p>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default Money;
