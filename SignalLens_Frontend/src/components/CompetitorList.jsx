import { runCheck, getHistory } from "../api";
import { useState } from "react";
import HistoryModal from "./HistoryModal";

export default function CompetitorList({ competitors }) {
  const [history, setHistory] = useState(null);

  const handleCheck = async (id) => {
    try {
      await runCheck(id);
      alert("Check started. Refresh history in a few seconds.");
    } catch (error) {
      console.error("Failed to run check", error);
      alert("Failed to run check. Please try again.");
    }
  };

  const handleHistory = async (id) => {
    try {
      const res = await getHistory(id);
      setHistory(res.data);
    } catch (error) {
      console.error("Failed to fetch history", error);
      alert("Failed to fetch history.");
    }
  };

  return (
    <div className="card">
      <h3 id="competitor-list-title">Competitors</h3>
      <ul aria-labelledby="competitor-list-title" style={{ listStyle: "none", padding: 0 }}>
        {competitors.map((c) => (
          <li key={c.id} className="row" aria-label={`Competitor ${c.name}`}>
            <div>
              <strong>{c.name}</strong>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                {c.url}
              </div>
            </div>

            <div>
              <button
                className="secondary"
                aria-label={`Run check for ${c.name}`}
                onClick={() => handleCheck(c.id)}
              >
                Check Now
              </button>

              <button
                className="primary"
                style={{ marginLeft: "8px" }}
                aria-label={`View history for ${c.name}`}
                onClick={() => handleHistory(c.id)}
              >
                View History
              </button>
            </div>
          </li>
        ))}
        {competitors.length === 0 && (
            <li style={{ textAlign: "center", color: "#64748b" }}>No competitors found</li>
        )}
      </ul>
      {history && <HistoryModal history={history} close={() => setHistory(null)} />}
    </div>
  );
}
