import logs from "../data/logs";

const Logs = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Logs</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.activity} – {log.carbon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
