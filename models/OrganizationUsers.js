import mongoose from "mongoose";

// Defining Schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  orgid: { type: mongoose.Schema.Types.ObjectId, ref: "organizations", required: true },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Model
const ProjectsModel = mongoose.model("projects", projectSchema);
// save
export const saveProjectsModel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new ProjectsModel(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllProjectsModel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = ProjectsModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export default ProjectsModel;
