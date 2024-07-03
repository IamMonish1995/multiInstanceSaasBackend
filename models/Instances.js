import db from "../schema/db.js";

// save
export const deleteInstancesModel = ({instanceId}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const delete_document = await db.InstancesModel.deleteOne({
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
      const doc = new db.InstancesModel(data);
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
      const updated_document = await db.InstancesModel.findByIdAndUpdate(
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
      const docs = db.InstancesModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllInstancesModelByProjectId = (projectid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.InstancesModel.find({ projectid });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getInstanceModelById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.InstancesModel.find({ _id:id });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
