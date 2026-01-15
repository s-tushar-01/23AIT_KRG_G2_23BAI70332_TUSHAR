import React from "react";
import logs from "../data/logs";

const Dashboard = () => {
  const total = logs.reduce((sum, log) => sum + log.carbon, 0);

  const highCarbonLogs = logs.filter(log => log.carbon > 4);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3 className="section-title">Total Carbon Footprint</h3>
      <p className="metric">
        <span className="metric-value">{total} kg</span>
      </p>

      <div className="section-card">
        <h3 className="section-title">All Activities</h3>
        <ul>
          {logs.map(log => (
            <li
              key={log.id}
              style={{ color: "#000" }}
            >
              {log.activity} → <span className="list-value" style={{ color: "#000" }}>{log.carbon} kg</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="section-card">
        <h3 className="section-title section-title--danger">High Carbon Emissions ( &gt; 4 kg )</h3>
        <ul>
          {highCarbonLogs.map(log => (
            <li
              key={log.id}
              style={{ color: "red" }}
            >
              {log.activity} → <span className="list-value">{log.carbon} kg</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
