import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

/* GET all events */
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

/* GET single event */
router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});

/* ADMIN: Add event */
router.post("/", async (req, res) => {
  const { title, date, location, description } = req.body;

  if (!title || !date || !location || !description)
    return res.status(400).json({ message: "All fields required" });

  const event = await Event.create(req.body);
  res.json(event);
});

/* ADMIN: Delete event */
router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

export default router;
