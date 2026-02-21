import { useEffect, useState } from "react";
import AddCompetitor from "./components/AddCompetitor";
import CompetitorList from "./components/CompetitorList";
import StatusBar from "./components/StatusBar";
import { getCompetitors } from "./api";

function App() {
  const [competitors, setCompetitors] = useState([]);

  const loadCompetitors = async () => {
    const res = await getCompetitors();
    setCompetitors(res.data);
  };

  useEffect(() => {
    loadCompetitors();
  }, []);

  return (
    <div className="container">
      <h1>SignalLens – Competitive Intelligence Tracker</h1>
      <StatusBar />
      <AddCompetitor refresh={loadCompetitors} />
      <CompetitorList
        competitors={competitors}
        refresh={loadCompetitors}
      />
    </div>
  );
}

export default App;
