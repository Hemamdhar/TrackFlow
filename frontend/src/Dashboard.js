import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = ({ leads, orders }) => {
  // Count leads by stage
  const stageCount = leads.reduce((acc, lead) => {
    acc[lead.stage] = (acc[lead.stage] || 0) + 1;
    return acc;
  }, {});

  // Count orders by status
  const orderCount = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const leadChart = {
    labels: Object.keys(stageCount),
    datasets: [
      {
        label: "Leads by Stage",
        data: Object.values(stageCount),
        backgroundColor: "#4f46e5",
      },
    ],
  };

  const orderChart = {
    labels: Object.keys(orderCount),
    datasets: [
      {
        label: "Orders by Status",
        data: Object.values(orderCount),
        backgroundColor: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"],
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Dashboard</h2>
      <div style={{ maxWidth: "600px", marginBottom: 50 }}>
        <Bar data={leadChart} />
      </div>
      <div style={{ maxWidth: "400px" }}>
        <Pie data={orderChart} />
      </div>
    </div>
  );
};

export default Dashboard;
