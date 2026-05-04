import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getAlerts, acceptAlert, markPicked } from "../api/api";
import AlertCard from "../components/AlertCard";

const socket = io("http://localhost:5000");

export default function NGODashboard() {
  const [alerts, setAlerts] = useState([]);

  // 🔄 Load initial alerts
  useEffect(() => {
    fetchAlerts();
  }, []);

  // 🔥 REAL-TIME LISTENER
  useEffect(() => {
    socket.on("new-alert", (newAlert) => {
      console.log("🔥 New Alert Received:", newAlert);

      // refresh full list
      fetchAlerts();
    });

    return () => {
      socket.off("new-alert");
    };
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await getAlerts();
      setAlerts(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to load alerts", err);
    }
  };

  const handleAccept = async (id) => {
    await acceptAlert(id);
    fetchAlerts();
  };

  const handlePicked = async (id) => {
    await markPicked(id);
    fetchAlerts();
  };

  return (
    <div className="container mt-4">

      <h2 className="text-success fw-bold mb-4 text-center">
        🌱 NGO Food Pickup Dashboard (Live)
      </h2>

      {alerts.length === 0 ? (
        <div className="alert alert-success text-center">
          No food alerts available
        </div>
      ) : (
        <div className="row">
          {alerts.map((alert) => (
            <div key={alert._id} className="col-md-6 mb-3">
              <AlertCard
                alert={alert}
                onAccept={handleAccept}
                onPicked={handlePicked}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}