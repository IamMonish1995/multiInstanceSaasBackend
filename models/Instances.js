import mongoose from "mongoose";

// Defining Schema
const InstancesSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  projectid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  },
  vercelprojectid: { type: String, trim: true },
  verceldeploymentid: { type: String, trim: true },
  feurl: { type: String, trim: true },
  beurl: { type: String, trim: true },
  creditcharged: { type: String, trim: true },
  createdby: { type: String, trim: true },
  status: { type: String, trim: true, default: "processing" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Model
const InstancesModel = mongoose.model("instances", InstancesSchema);
// save
export const saveInstancesModel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new InstancesModel(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateInstancesModel = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updated_document = await InstancesModel.findByIdAndUpdate(
        id,
        data,
        { new: true }
      );
      resolve(updated_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllInstancesModel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = InstancesModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllInstancesModelByProjectId = (projectid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = InstancesModel.find({ projectid });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getInstanceModelById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = InstancesModel.find({ _id:id });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export default InstancesModel;
