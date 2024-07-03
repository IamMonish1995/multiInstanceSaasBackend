import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  menu_name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: false },
  created_by_user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  }
});

export const MenusModal = mongoose.model("Menus", MenuSchema);