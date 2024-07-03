import mongoose from "mongoose";

// Defining Schema
const OrganizationUserSchema = new mongoose.Schema({
  org_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizations', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: false },
  created_by_user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  }
});

// Model 
export const OrganizationUsersModel = mongoose.model("OrganizationUsers", OrganizationUserSchema);