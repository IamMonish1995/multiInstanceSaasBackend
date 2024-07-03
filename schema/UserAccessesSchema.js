import mongoose from "mongoose";

const UserAccessSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true },
  menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menus', required: true },
  can_create: { type: Boolean, default: false },
  can_read: { type: Boolean, default: false },
  can_update: { type: Boolean, default: false },
  can_delete: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: false },
  created_by_user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  }
});

export const UserAccessModal = mongoose.model("Useraccesses", UserAccessSchema);