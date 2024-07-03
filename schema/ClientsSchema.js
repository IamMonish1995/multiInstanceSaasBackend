import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  client_name: { type: String, required: true },
  org_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organizations",
    required: true,
  },
  credits_balance: { type: Number, default: 0 },
  payment_gateway_key: { type: String },
  payment_gateway_secret: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: false },
  created_by_user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  }
});

export const ClientsModal = mongoose.model("Clients", ClientSchema);