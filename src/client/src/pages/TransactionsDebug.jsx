import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import "./TransactionsDebug.css";

function TransactionsDebug() {
  const { token, user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState(null);

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/plaid/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setError("Please log in to view transactions.");
        } else {
          setError(data.error || "Failed to fetch transactions");
        }
        setTransactions([]);
        return;
      }

      setTransactions(data.transactions || []);
      setError(null);
    } catch (err) {
      setError("Network error. Please try again.");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("Please log in to view transactions.");
      return;
    }
    fetchTransactions();
  }, [token]);

  async function handleRefresh() {
    if (!token) return;
    setRefreshLoading(true);
    setRefreshMessage(null);
    try {
      const res = await fetch("/api/plaid/refresh-transactions", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        setRefreshMessage(data.error || "Refresh failed");
        return;
      }
      setRefreshMessage(
        data.errors?.length
          ? `Refreshed ${data.refreshed} item(s). Some errors: ${data.errors.map((e) => e.message).join(", ")}`
          : "Refreshed. Fetching latest transactions..."
      );
      await fetchTransactions();
      if (!data.errors?.length) setRefreshMessage("Done. Transactions updated.");
    } catch (err) {
      setRefreshMessage("Network error during refresh.");
    } finally {
      setRefreshLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="app">
        <div className="phone-container">
          <div className="top-section" />
          <div className="main-content login-content debug-content">
            <h1 className="login-title">Transactions Debug</h1>
            <p className="error-text">{error}</p>
            <Link to="/login" className="signin-text">
              <span>Sign in</span> to view transactions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="phone-container">
        <div className="top-section" />
        <div className="main-content login-content debug-content">
          <h1 className="login-title">Transactions Debug</h1>
          <p className="login-subtitle">
            Plaid transactions and categories (dev only)
          </p>
          <p className="debug-user">
            Logged in as: <strong>{user?.name ?? "—"}</strong> ({user?.email ?? "—"})
          </p>
          <p className="debug-auth-note">
            One user per browser (JWT in localStorage). Server validates token per request.
          </p>

          <div className="debug-refresh-row">
            <button
              type="button"
              className="debug-refresh-btn"
              onClick={handleRefresh}
              disabled={loading || refreshLoading}
            >
              {refreshLoading ? "Refreshing…" : "Refresh from Plaid"}
            </button>
            {refreshMessage && (
              <p className="debug-refresh-msg">{refreshMessage}</p>
            )}
          </div>

          {loading && <p className="debug-loading">Loading transactions...</p>}

          {error && !loading && <p className="error-text">{error}</p>}

          {!loading && !error && transactions.length === 0 && (
            <div className="debug-empty">
              <p>No transactions found.</p>
              <p>
                <Link to="/connect-bank" className="debug-link">
                  Connect a bank
                </Link>{" "}
                via Plaid to fetch transactions.
              </p>
            </div>
          )}

          {!loading && !error && transactions.length > 0 && (
            <div className="debug-table-wrapper">
              <table className="debug-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Merchant</th>
                    <th>Amount</th>
                    <th>Legacy Category</th>
                    <th>Personal Finance Category</th>
                    <th>Confidence</th>
                    <th>Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td>{t.date}</td>
                      <td>{t.name}</td>
                      <td>{t.merchantName || "—"}</td>
                      <td className="debug-amount">
                        ${typeof t.amount === "number" ? t.amount.toFixed(2) : t.amount}
                      </td>
                      <td>
                        {Array.isArray(t.category) && t.category.length > 0
                          ? t.category.join(" > ")
                          : "—"}
                      </td>
                      <td>
                        {t.personalFinanceCategory?.primary
                          ? `${t.personalFinanceCategory.primary}${t.personalFinanceCategory.detailed ? ` / ${t.personalFinanceCategory.detailed}` : ""}`
                          : "—"}
                      </td>
                      <td>{t.personalFinanceCategory?.confidenceLevel || "—"}</td>
                      <td>{t.pending ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionsDebug;
