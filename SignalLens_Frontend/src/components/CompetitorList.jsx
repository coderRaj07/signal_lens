import { runCheck, getHistory } from "../api";
import { useState } from "react";
import HistoryModal from "./HistoryModal";

export default function CompetitorList({ competitors }) {
  const [history, setHistory] = useState(null);

  const handleCheck = async (id) => {
    await runCheck(id);
    alert("Check started. Refresh history in a few seconds.");
  };

  const handleHistory = async (id) => {
    const res = await getHistory(id);
    setHistory(res.data);
  };

  return (
    <div className="card">
      <h3>Competitors</h3>
      {competitors.map((c) => (
            <div key={c.id} className="row">
            <div>
                <strong>{c.name}</strong>
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                {c.url}
                </div>
            </div>

            <div>
                <button
                className="secondary"
                onClick={() => handleCheck(c.id)}
                >
                Check Now
                </button>

                <button
                className="primary"
                style={{ marginLeft: "8px" }}
                onClick={() => handleHistory(c.id)}
                >
                View History
                </button>
            </div>
            </div>
      ))}
      {history && <HistoryModal history={history} close={() => setHistory(null)} />}
    </div>
  );
}
