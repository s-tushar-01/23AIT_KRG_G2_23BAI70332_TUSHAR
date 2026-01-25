import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        padding: "1rem",
        background: "#2ecc71",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT: Logo (ALWAYS visible) */}
      <h2 style={{ margin: 0 }}>EcoTrack</h2>

      {/* RIGHT: Navigation */}
      <nav style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={{ color: "white" }}>
              Dashboard
            </Link>
            <Link to="/dashboard/summary" style={{ color: "white" }}>
              Summary
            </Link>
            <Link to="/dashboard/analytics" style={{ color: "white" }}>
              Analytics
            </Link>
            <Link to="/logs" style={{ color: "white" }}>
              Logs
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
