import mongoose from "mongoose";

// Defining Schema
const SystemUserSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: false,
  },
});

// Model
export const SystemUsersModel = mongoose.model("Systemusers", SystemUserSchema);