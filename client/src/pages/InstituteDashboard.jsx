import { useEffect, useState } from "react";
import { getAlerts, getFoodData } from "../api/api";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  LineChart, Line, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";
import "../styles/dashboard.css";

function InstituteDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const alertsRes = await getAlerts();
        const alertArray = Array.isArray(alertsRes.data)
          ? alertsRes.data
          : alertsRes.data.data || [];
        setAlerts(alertArray);

        const foodRes = await getFoodData();
        const foodArray = Array.isArray(foodRes.data.data)
          ? foodRes.data.data
          : [];
        setFoodData(foodArray);

      } catch (err) {
        console.error("Dashboard load error:", err);
        setAlerts([]);
        setFoodData([]);
      }
    };

    loadData();
  }, []);

  // ✅ CORRECT PDF DOWNLOAD
  const downloadReport = () => {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    alert("Login again");
    return;
  }

  const user = JSON.parse(userStr);

  console.log("USER FROM STORAGE:", user);

  if (!user._id) {
    alert("User ID missing. Login again.");
    return;
  }

  window.open(
    `http://localhost:5000/api/report/download/${user._id}`,
    "_blank"
  );
};
  const safeFood = Array.isArray(foodData) ? foodData : [];

  const totalPrepared = safeFood.reduce((s, f) => s + (f.preparedQty || 0), 0);
  const totalConsumed = safeFood.reduce((s, f) => s + (f.consumedQty || 0), 0);
  const totalWasted = totalPrepared - totalConsumed;

  const pieData = [
    { name: "Consumed", value: totalConsumed },
    { name: "Wasted", value: totalWasted },
    { name: "Shared", value: 0 },
  ];

  const wasteByDate = {};
  safeFood.forEach((f) => {
    const waste = (f.preparedQty || 0) - (f.consumedQty || 0);
    const date = new Date(f.date).toLocaleDateString();
    wasteByDate[date] = (wasteByDate[date] || 0) + waste;
  });

  const chartData = Object.keys(wasteByDate).map((date) => ({
    name: date,
    waste: wasteByDate[date],
  }));

  const COLORS = ["#2e7d32", "#c62828", "#1565c0"];

  return (
    <div className="dash-wrapper">
      <h1 className="dash-title">🏫 Institute Dashboard</h1>

      <div style={{ textAlign: "right", marginBottom: "15px" }}>
        <button className="report-btn" onClick={downloadReport}>
          📄 Download Monthly Report (PDF)
        </button>
      </div>

      <div className="card alerts-card">
        <h3>🚨 Alerts</h3>
        {alerts.length === 0 ? (
          <p>No alerts</p>
        ) : (
          alerts.map((a, i) => (
            <div key={i} className="alert-item">⚠️ {a.message}</div>
          ))
        )}
      </div>

      <div className="charts-grid">
        <div className="card chart-card">
          <h4>Food Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100} label>
                {pieData.map((e, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h4>Waste by Date</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="waste" fill="#2e7d32" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card full-width">
          <h4>Waste Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="waste" stroke="#1b5e20" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card suggestion-card">
        <h3>💡 Suggestions</h3>
        <ul>
          <li>Reduce preparation if waste is high</li>
          <li>Improve portion control</li>
          <li>Share surplus food with NGOs</li>
        </ul>
      </div>
    </div>
  );
}

export default InstituteDashboard;