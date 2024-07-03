import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    status_name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

export const StatusModal = mongoose.model('Status', statusSchema);