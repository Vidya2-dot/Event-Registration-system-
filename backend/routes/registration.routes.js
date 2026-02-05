import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// Register User
router.post("/", async (req, res) => {
  try {
    const registration = await Registration.create(req.body);
    console.log(`📧 Mock email sent to ${registration.email}`);
    res.status(201).json(registration);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Already registered" });
    }
    res.status(400).json({ message: err.message });
  }
});

// Get Registered Users by Event
router.get("/:eventId", async (req, res) => {
  const users = await Registration.find({ eventId: req.params.eventId });
  res.json(users);
});

export default router;
