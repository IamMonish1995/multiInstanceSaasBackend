import mongoose from "mongoose";

// Defining Schema
const InstancesSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  projectid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  },
  plateformprojectbeid: { type: String, trim: true },
  plateformdeploymentbeid: { type: String, trim: true },
  plateformprojectfeid: { type: String, trim: true },
  plateformdeploymentfeid: { type: String, trim: true },
  plateformgitberepoid: { type: String, trim: true },
  plateformgitferepoid: { type: String, trim: true },
  feurl: { type: String, trim: true },
  beurl: { type: String, trim: true },
  creditcharged: { type: String, trim: true },
  createdby: { type: String, trim: true },
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
export const InstancesModel = mongoose.model("instances", InstancesSchema);