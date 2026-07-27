import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateLead = async () => {
    if (!url) {
      setError("Please enter a website URL");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setLead(null);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/enrich",
        {
          url: url,
        }
      );

      setLead(response.data);
    } catch (err) {
      setError("Failed to generate lead. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <h1>AI LeadGen</h1>
        <span>AI-Powered Lead Intelligence</span>
      </header>

      <main className="container">
        <section className="hero">
          <h2>Turn Websites Into Qualified Leads</h2>
          <p>
            Enter a company website and let AI extract valuable business
            information automatically.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="https://company.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button onClick={generateLead} disabled={loading}>
              {loading ? "Analyzing..." : "Generate Lead"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}
        </section>

        {lead && (
          <section className="lead-card">
            <div className="lead-header">
              <div>
                <h2>{lead.company_name}</h2>
                <a href={lead.website} target="_blank" rel="noreferrer">
                  {lead.website}
                </a>
              </div>

              <div className="score">
                <span>Lead Score</span>
                <strong>{lead.lead_score ?? "N/A"}</strong>
              </div>
            </div>

            <div className="lead-grid">
              <div>
                <label>Industry</label>
                <p>{lead.industry || "Not available"}</p>
              </div>

              <div>
                <label>Email</label>
                <p>{lead.email || "Not available"}</p>
              </div>

              <div>
                <label>Phone</label>
                <p>{lead.phone || "Not available"}</p>
              </div>

              <div>
                <label>Location</label>
                <p>{lead.location || "Not available"}</p>
              </div>
            </div>

            <div className="description">
              <label>Description</label>
              <p>{lead.description || "No description available."}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;