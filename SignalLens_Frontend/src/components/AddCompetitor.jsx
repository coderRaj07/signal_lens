import { useState } from "react";
import { addCompetitor } from "../api";

export default function AddCompetitor({ refresh }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    await addCompetitor({ name, url });
    setName("");
    setUrl("");
    refresh();
  };

  return (
    <div className="card">
      <h3>Add Competitor</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="primary" onClick={handleSubmit}>
        Add Competitor
      </button>
    </div>
  );
}
