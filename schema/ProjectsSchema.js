import mongoose from "mongoose";

// Defining Schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  orgid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organizations",
    required: true,
  },
  gitsourcefeurl: { type: String, required: true, trim: true },
  feframework: { type: String, required: true, trim: true },
  feenv: [
    {
      type: { type: String, default: "plain", trim: true },
      key: { type: String, trim: true },
      target: { type: String, default: "production", trim: true },
      value: { type: String, trim: true },
    },
  ],
  gitsourcebeurl: { type: String, trim: true },
  beframework: { type: String, trim: true },
  beenv: [
    {
      type: { type: String, default: "plain", trim: true },
      key: { type: String, trim: true },
      target: { type: String, default: "production", trim: true },
      value: { type: String, trim: true },
    },
  ],
  gitsourcetype: { type: String, required: true, trim: true },
  creditneeded: { type: String, trim: true, default: 0 },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: false },
  created_by_user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  }
});

// Model
export const ProjectsModel = mongoose.model("projects", projectSchema);