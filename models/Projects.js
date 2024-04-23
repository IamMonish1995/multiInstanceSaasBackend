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
export const getAllProjectsByOrgIdModal = (orgid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = ProjectsModel.find({ orgid });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getProjectModelById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = ProjectsModel.findOne({ _id: id });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export default ProjectsModel;
