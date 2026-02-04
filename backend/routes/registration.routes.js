import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

/* =========================
   REGISTER FOR EVENT
========================= */
router.post("/", async (req, res) => {
  try {
    const { eventId, userEmail, name, phone } = req.body;

    if (!eventId || !userEmail || !name || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    const registration = await Registration.create({
      eventId,
      userEmail,
      name,
      phone
    });

    res.status(201).json(registration);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Already registered for this event" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   GET REGISTRATIONS BY EVENT (ADMIN)
========================= */
router.get("/event/:eventId", async (req, res) => {
  const registrations = await Registration.find({
    eventId: req.params.eventId
  });
  res.json(registrations);
});

/* =========================
   GET REGISTRATIONS BY USER
========================= */
router.get("/user/:email", async (req, res) => {
  const registrations = await Registration.find({
    userEmail: req.params.email
  }).populate("eventId");

  res.json(registrations);
});

export default router;
