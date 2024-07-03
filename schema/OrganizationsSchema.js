import mongoose from "mongoose";

// Defining Schema
const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  organization_domain: { type: String, trim: true },
  organization_no_of_products: { type: String, trim: true },
  website: { type: String, trim: true },
  logo: { type: String, trim: true },
  credits: { type: Number, trim: true, default: 0 },
  active_plan: { type: String, trim: true, default: "free" },
  payment_gateway_key: { type: String },
  payment_gateway_secret: { type: String },
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
    required: false,
  }
});

// Model
export const OrganizationModel = mongoose.model("Organizations", organizationSchema);