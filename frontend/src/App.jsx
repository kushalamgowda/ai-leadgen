import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "http://127.0.0.1:8000/api/v1";

function App() {
  const [url, setUrl] = useState("");
  const [lead, setLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
  total: 0,
  average: 0,
  highScore: 0,
  industries: 0,
});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingLead, setEditingLead] = useState(null);

  // ----------------------------
  // Fetch all saved leads
  // ----------------------------
  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${API}/leads`);
      const data = response.data;

setLeads(data);

const total = data.length;

const average =
  total === 0
    ? 0
    : Math.round(
        data.reduce(
          (sum, item) => sum + (item.lead_score || 0),
          0
        ) / total
      );

const highScore = data.filter(
  (item) => (item.lead_score || 0) >= 80
).length;

const industries = new Set(
  data
    .map((item) => item.industry)
    .filter(Boolean)
).size;

setStats({
  total,
  average,
  highScore,
  industries,
});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // ----------------------------
  // Generate Lead
  // ----------------------------
  const generateLead = async () => {
    if (!url) {
      setError("Please enter a website URL");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${API}/enrich`, {
        url,
      });

      setLead(response.data);
      fetchLeads();
    } catch (err) {
      setError("Failed to generate lead.");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Delete Lead
  // ----------------------------
  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      await axios.delete(`${API}/leads/${id}`);
      fetchLeads();
    } catch (err) {
      alert("Failed to delete lead");
    }
  };

  // ----------------------------
  // Get Single Lead
  // ----------------------------
  const viewLead = async (id) => {
    try {
      const response = await axios.get(`${API}/leads/${id}`);
      setLead(response.data);
    } catch (err) {
      alert("Unable to fetch lead");
    }
  };

  // ----------------------------
  // Edit Button
  // ----------------------------
  const editLead = (lead) => {
    setEditingLead({ ...lead });
  };

  <section className="stats">

  <div className="stat-card">
    <h3>Total Leads</h3>
    <h1>{stats.total}</h1>
  </div>

  <div className="stat-card">
    <h3>Average Score</h3>
    <h1>{stats.average}</h1>
  </div>

  <div className="stat-card">
    <h3>High Score Leads</h3>
    <h1>{stats.highScore}</h1>
  </div>

  <div className="stat-card">
    <h3>Industries</h3>
    <h1>{stats.industries}</h1>
  </div>

</section>

  // ----------------------------
  // Update Lead
  // ----------------------------
  const saveLead = async () => {
    try {
      await axios.put(`${API}/leads/${editingLead.id}`, {
        company_name: editingLead.company_name,
        industry: editingLead.industry,
        description: editingLead.description,
        email: editingLead.email,
        phone: editingLead.phone,
        location: editingLead.location,
        lead_score: editingLead.lead_score,
      });

      setEditingLead(null);
      fetchLeads();
    } catch (err) {
      alert("Failed to update lead");
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
            Enter a company website and let AI extract business information
            automatically.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="https://company.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button
              onClick={generateLead}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Lead"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

        </section>

        {lead && (
          <section className="lead-card">

            <div className="lead-header">

              <div>
                <h2>{lead.company_name}</h2>

                <a
                  href={lead.website}
                  target="_blank"
                  rel="noreferrer"
                >
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
                <p>{lead.industry || "-"}</p>
              </div>

              <div>
                <label>Email</label>
                <p>{lead.email || "-"}</p>
              </div>

              <div>
                <label>Phone</label>
                <p>{lead.phone || "-"}</p>
              </div>

              <div>
                <label>Location</label>
                <p>{lead.location || "-"}</p>
              </div>

            </div>

            <div className="description">
              <label>Description</label>
              <p>{lead.description}</p>
            </div>

          </section>
        )}

        <section className="lead-card">

          <h2>Saved Leads</h2>

          <table className="leads-table">

            <thead>

              <tr>
                <th>Company</th>
                <th>Industry</th>
                <th>Email</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {leads.map((item) => (

                <tr key={item.id}>

                  <td>{item.company_name}</td>

                  <td>{item.industry || "-"}</td>

                  <td>{item.email || "-"}</td>

                  <td>{item.lead_score}</td>

                  <td>

                    <button
                      onClick={() => viewLead(item.id)}
                    >
                      View
                    </button>

                    <button
                      onClick={() => editLead(item)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteLead(item.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </section>

      </main>

      {editingLead && (

        <div className="modal">

          <div className="modal-content">

            <h2>Edit Lead</h2>

            <input
              value={editingLead.company_name}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  company_name: e.target.value,
                })
              }
              placeholder="Company"
            />

            <input
              value={editingLead.industry || ""}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  industry: e.target.value,
                })
              }
              placeholder="Industry"
            />

            <input
              value={editingLead.email || ""}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />

            <input
              value={editingLead.phone || ""}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  phone: e.target.value,
                })
              }
              placeholder="Phone"
            />

            <input
              value={editingLead.location || ""}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  location: e.target.value,
                })
              }
              placeholder="Location"
            />

            <input
              type="number"
              value={editingLead.lead_score || 0}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  lead_score: Number(e.target.value),
                })
              }
              placeholder="Score"
            />

            <textarea
              rows="5"
              value={editingLead.description || ""}
              onChange={(e) =>
                setEditingLead({
                  ...editingLead,
                  description: e.target.value,
                })
              }
            />

            <br />

            <button onClick={saveLead}>
              Save
            </button>

            <button
              onClick={() => setEditingLead(null)}
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;