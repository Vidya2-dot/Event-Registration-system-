import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import eventRoutes from "./routes/event.routes.js";
import regRoutes from "./routes/registration.routes.js";
import userRoutes from "./routes/user.routes.js"; // ✅ IMPORTANT

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/users", userRoutes);   // ✅ User register/login
app.use("/api/events", eventRoutes); // ✅ Events
app.use("/api/register", regRoutes); // ✅ Registrations

app.get("/", (req, res) => {
  res.send("Event Registration API is running");
});

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
