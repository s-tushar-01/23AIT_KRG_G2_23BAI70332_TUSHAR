import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/profile", {
        auth: { username, password },
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false
      });

      if (res.status === 200) {
        const role = username.includes("admin") ? "ADMIN" : "USER";
        sessionStorage.setItem("user", username);
        sessionStorage.setItem("role", role);

        if (role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/user";
        }
      }
    } catch (err) {
      alert("Invalid Credentials: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input className="form-control" placeholder="Username"
        onChange={(e) => setUsername(e.target.value)} /><br/>
      <input className="form-control" type="password" placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} /><br/>
      <button className="btn btn-primary" onClick={login}>Login</button>
    </div>
  );
}

export default Login;