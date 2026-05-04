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

  // ✅ LOAD DATA SAFELY
  useEffect(() => {
    const loadData = async () => {
      try {
        const alertsRes = await getAlerts();
        setAlerts(Array.isArray(alertsRes.data.data) ? alertsRes.data.data : []);

        const foodRes = await getFoodData();
        setFoodData(Array.isArray(foodRes.data.data) ? foodRes.data.data : []);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setAlerts([]);
        setFoodData([]);
      }
    };

    loadData();
  }, []);

  // ✅ SAFE ARRAY
  const safeFood = Array.isArray(foodData) ? foodData : [];

  // ✅ TOTALS
  const totalPrepared = safeFood.reduce((sum, f) => sum + (f.preparedQty || 0), 0);
  const totalConsumed = safeFood.reduce((sum, f) => sum + (f.consumedQty || 0), 0);
  const totalWasted = totalPrepared - totalConsumed;

  // ✅ PIE DATA
  const pieData = [
    { name: "Consumed", value: totalConsumed },
    { name: "Wasted", value: totalWasted },
    { name: "Shared", value: 0 },
  ];

  // ✅ WASTE BY DATE (Bar + Line)
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

      {/* ALERTS */}
      <div className="card alerts-card">
        <h3>🚨 Alerts</h3>
        {Array.isArray(alerts) && alerts.length === 0 ? (
          <p>No alerts</p>
        ) : (
          alerts.map((a, i) => (
            <div key={i} className="alert-item">⚠️ {a.message}</div>
          ))
        )}
      </div>

      {/* CHARTS */}
      <div className="charts-grid">

        {/* PIE */}
        <div className="card chart-card">
          <h4>Food Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
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

        {/* LINE */}
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

      {/* SUGGESTIONS */}
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