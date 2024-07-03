import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    external_user_id: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export const UsersModal = mongoose.model('Users', userSchema);