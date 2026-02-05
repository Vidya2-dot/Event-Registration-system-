import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import eventRoutes from "./routes/event.routes.js";
import regRoutes from "./routes/registration.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/register", regRoutes);

app.listen(5000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);
