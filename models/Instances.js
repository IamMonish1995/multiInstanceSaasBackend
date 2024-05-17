import mongoose from "mongoose";

// Defining Schema
const InstancesSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  projectid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  },
  plateformprojectbeid: { type: String, trim: true },
  plateformdeploymentbeid: { type: String, trim: true },
  plateformprojectfeid: { type: String, trim: true },
  plateformdeploymentfeid: { type: String, trim: true },
  plateformgitberepoid: { type: String, trim: true },
  plateformgitferepoid: { type: String, trim: true },
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
export const deleteInstancesModel = ({instanceId}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const delete_document = await InstancesModel.deleteOne({
        _id: instanceId,
      });
      resolve(delete_document);
    } catch (error) {
      reject(error);
    }
  });
};
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
