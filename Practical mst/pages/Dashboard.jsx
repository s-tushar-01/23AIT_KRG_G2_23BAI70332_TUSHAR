import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>EcoTrack Dashboard</h1>

        <p style={styles.text}>
          Welcome! You are successfully logged in.
        </p>

        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>

  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9"
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "350px"
  },

  title: {
    marginBottom: "10px",
    color: "#2c3e50"
  },

  text: {
    marginBottom: "20px",
    color: "#555"
  },

  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    background: "#e74c3c",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  }

};

export default Dashboard;