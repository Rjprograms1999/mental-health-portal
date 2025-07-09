const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "therapist"], default: "user" },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    emergencyContact: {
      name: String,
      phone: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
