import axios from "axios";
import { BACKEND_URL } from "../config";

// Axios instance (NO cookies)
const api = axios.create({
  baseURL: BACKEND_URL,
});

// ✅ Attach userId in header for every request
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    config.headers["userid"] = userId;
  }
  return config;
});

// ================= AUTH =================
export const registerUser = (data) =>
  api.post("/api/auth/register", data);

export const loginUser = (data) =>
  api.post("/api/auth/login", data);

// ================= FOOD =================
export const addFoodData = (data) =>
  api.post("/api/food", data);

export const getFoodData = () =>
  api.get("/api/food");

export const getFoodById = (id) =>
  api.get(`/api/food/${id}`);

export const updateFoodData = (id, data) =>
  api.put(`/api/food/${id}`, data);

export const deleteFoodData = (id) =>
  api.delete(`/api/food/${id}`);

// ================= ALERTS =================
export const getAlerts = () =>
  api.get("/api/alerts/myalerts");

// ================= ALERT ACTIONS =================
export const acceptAlert = (alertId) =>
  api.post("/api/alerts/accept", { alertId });

export const markPicked = (alertId) =>
  api.post("/api/alerts/picked", { alertId });