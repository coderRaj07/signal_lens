export default function HistoryModal({ history, close }) {

  const parseSummary = (summary) => {
    if (!summary) return null;

    try {
      const parsed = JSON.parse(summary);
      if (typeof parsed === "object") return parsed;
      return null;
    } catch {
      return null;
    }
  };

  const renderSummaryContent = (summary) => {
    const parsed = parseSummary(summary);

    // ---------------- Structured JSON Case ----------------
    if (parsed && parsed.summary) {
      const summaryLines = Array.isArray(parsed.summary)
        ? parsed.summary
        : String(parsed.summary).split("\n");

      return (
        <div className="analysis-box">

          {parsed.change_types?.length > 0 && (
            <div className="change-types">
              {parsed.change_types.map((type, i) => (
                <span key={i} className="tag">
                  {type}
                </span>
              ))}
            </div>
          )}

          <ul className="summary-list">
            {summaryLines.map((line, i) => (
              <li key={i}>{line.replace(/^- /, "")}</li>
            ))}
          </ul>

          {parsed.confidence !== undefined && (
            <div className="confidence">
              Confidence: {parsed.confidence}%
            </div>
          )}
        </div>
      );
    }

    // ---------------- Plain String Case ----------------
    const lines = String(summary)
      .split("\n")
      .filter(Boolean);

    return (
      <ul className="summary-list">
        {lines.map((line, i) => (
          <li key={i}>{line.replace(/^- /, "")}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Last 5 Checks</h3>

        {history.map((h) => (
          <div key={h.id} className="history-item">

            <div className="history-header">
              <strong>
                {new Date(h.created_at).toLocaleString()}
              </strong>

              <div>
                <span className="change-percentage">
                  {h.change_percentage.toFixed(2)}%
                </span>

                <span className={`badge ${h.is_significant ? "red" : "green"}`}>
                  {h.is_significant ? "Significant" : "Minor"}
                </span>
              </div>
            </div>

            {renderSummaryContent(h.summary)}

          </div>
        ))}

        <button className="primary" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}
