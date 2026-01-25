import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          width: "320px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Welcome to EcoTrack 🌍</h2>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Track your environmental impact
        </p>
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            marginTop: "1rem",
            background: "#1e7f5c",
            color: "white",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
