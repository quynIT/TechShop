const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "staff"],
      default: "user",
      required: true,
    },
    phone: { type: String },
    address: { type: String },
    avatar: { type: String },
  },

  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
