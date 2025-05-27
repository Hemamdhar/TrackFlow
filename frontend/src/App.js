import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

function App() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [status, setStatus] = useState("Order Received");
  const [dispatchInfo, setDispatchInfo] = useState("");

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
    fetchOrders();
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
        name: name,
        contact: contact,
        stage: "New",
      })
      .then(() => {
        setName("");
        setContact("");
        fetchLeads();
      });
  };

  const updateStage = (leadId, newStage) => {
    axios
      .put(`http://localhost:8000/leads/${leadId}/stage/?stage=${newStage}`)
      .then(() => fetchLeads());
  };

  const fetchOrders = () => {
    axios
      .get("http://localhost:8000/orders/")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  };

  const addOrder = () => {
    axios
      .post("http://localhost:8000/orders/", {
        lead_id: parseInt(selectedLeadId),
        status: status,
        dispatch_date: new Date().toISOString().split("T")[0],
        tracking_info: dispatchInfo,
      })
      .then(() => {
        setSelectedLeadId("");
        setStatus("Order Received");
        setDispatchInfo("");
        fetchOrders();
      });
  };

  return (
    <>
      <Dashboard leads={leads} orders={orders} />
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
              {lead.name} ({lead.contact}) —<strong> {lead.stage}</strong>{" "}
              &nbsp;
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

        <hr />
        <h3>Create Order</h3>
        <select
          value={selectedLeadId}
          onChange={(e) => setSelectedLeadId(e.target.value)}
        >
          <option value="">Select Lead</option>
          {leads.map((lead) => (
            <option key={lead.id} value={lead.id}>
              {lead.name}
            </option>
          ))}
        </select>
        <br />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Order Received">Order Received</option>
          <option value="In Development">In Development</option>
          <option value="Ready to Dispatch">Ready to Dispatch</option>
          <option value="Dispatched">Dispatched</option>
        </select>
        <br />
        <input
          placeholder="Courier & Tracking Info"
          value={dispatchInfo}
          onChange={(e) => setDispatchInfo(e.target.value)}
        />
        <button onClick={addOrder}>Add Order</button>

        <h3>All Orders</h3>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Lead #{order.lead_id} — <strong>{order.status}</strong>
              <br />
              Tracking: {order.tracking_info}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
