import React from "react";
import axios from "axios";

function UserDashboard() {
  const role = sessionStorage.getItem("role");

  if (!role) window.location.href = "/";

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/profile");
      alert(res.data.message);
    } catch {
      alert("Unauthorized");
    }
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <h2>User Dashboard</h2>
      <button className="btn btn-success" onClick={fetchData}>
        Get Profile
      </button>
      <br/><br/>
      <button className="btn btn-secondary" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default UserDashboard;