import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const stages = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Won",
    "Lost",
  ];

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    axios
      .get("http://localhost:8000/leads/")
      .then((res) => setLeads(res.data))
      .catch((err) => console.error(err));
  };

  const addLead = () => {
    axios
      .post("http://localhost:8000/leads/", {
        name,
        contact,
        company: "Demo Co",
        stage: "New",
        follow_up_date: null,
      })
      .then(() => {
        setName("");
        setContact("");
        fetchLeads();
      });
  };

  const updateStage = (id, stage) => {
    axios
      .put(`http://localhost:8000/leads/${id}/stage/?stage=${stage}`)
      .then(() => fetchLeads())
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>TrackFlow - Lead Manager</h1>

      <h3>Add New Lead</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <button onClick={addLead}>Add Lead</button>

      <h3>All Leads</h3>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id} style={{ marginBottom: "10px" }}>
            {lead.name} ({lead.contact}) —<strong> {lead.stage}</strong> &nbsp;
            <select
              value={lead.stage}
              onChange={(e) => updateStage(lead.id, e.target.value)}
            >
              {stages.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
