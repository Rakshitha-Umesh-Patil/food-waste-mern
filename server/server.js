require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const alertRoutes = require("./routes/alertRoutes");
const foodDonationRoutes = require("./routes/foodDonationRoutes");

connectDB();

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

/* =======================
   HTTP + SOCKET SERVER
======================= */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// make io accessible in controllers
app.set("io", io);

/* =======================
   SOCKET EVENTS
======================= */
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("new-alert", (data) => {
    console.log("🚨 Alert received:", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/donations", foodDonationRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.send("Food Waste Management API Running 🚀");
});

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});