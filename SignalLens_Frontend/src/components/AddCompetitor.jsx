import { useState } from "react";
import { addCompetitor } from "../api";

export default function AddCompetitor({ refresh }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !url) return;
    try {
      await addCompetitor({ name, url });
      setName("");
      setUrl("");
      refresh();
    } catch (error) {
      console.error("Failed to add competitor:", error);
    }
  };

  return (
    <div className="card">
      <h3>Add Competitor</h3>
      <form onSubmit={handleSubmit} noValidate={false}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="competitorName" className="sr-only" style={{ display: "none" }}>Name</label>
          <input
            id="competitorName"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-required="true"
            aria-label="Competitor Name"
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="competitorUrl" className="sr-only" style={{ display: "none" }}>URL</label>
          <input
            id="competitorUrl"
            type="url"
            placeholder="URL (e.g. https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            aria-required="true"
            aria-label="Competitor URL"
          />
        </div>
        <button type="submit" className="primary" aria-label="Submit Add Competitor Form">
          Add Competitor
        </button>
      </form>
    </div>
  );
}
