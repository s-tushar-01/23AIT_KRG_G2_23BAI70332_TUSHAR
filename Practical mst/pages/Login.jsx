import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    // Dummy login
    login();
    navigate("/dashboard");
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>EcoTrack Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>

        </form>

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
    background: "linear-gradient(135deg, #4CAF50, #2ecc71)"
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    width: "350px",
    textAlign: "center"
  },

  title: {
    marginBottom: "20px",
    color: "#2c3e50"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#27ae60",
    border: "none",
    color: "white",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer"
  }

};

export default Login;