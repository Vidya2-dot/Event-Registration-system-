import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now }
});

// Prevent duplicate registrations
registrationSchema.index({ userEmail: 1, eventId: 1 }, { unique: true });

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Registration;
