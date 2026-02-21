import { useEffect, useState } from "react";
import { getStatus } from "../api";

export default function StatusBar() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getStatus().then((res) => setStatus(res.data));
  }, []);

  if (!status) return null;

  return (
    <div className="status">
        Backend: {status.backend} | 
        Database: {status.database} | 
        LLM: {status.llm}
    </div>
    );

}
