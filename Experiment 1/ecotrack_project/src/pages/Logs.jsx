import React from "react";
import logs from "../data/logs";

const Logs = () => {
  return (
    <div>
      <div className="section-card">
        <h3 className="section-title section-title--success">Low Carbon( &lt; 4 kgs)</h3>
        <ul>
          {logs
            .filter(log => log.carbon < 4)
            .map(log => (
              <li
                key={log.id}
                style={{ color: "green" }}
              >
                {log.activity} → <span className="list-value">{log.carbon} kg</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Logs;
