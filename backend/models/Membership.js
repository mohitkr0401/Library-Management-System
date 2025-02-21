const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  membershipId: { type: String, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
});

module.exports = mongoose.model("Membership", membershipSchema);