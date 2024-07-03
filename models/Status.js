import db from "../schema/db.js";

// save
export const CreateStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new db.StatusModal(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const FindStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.StatusModal.findOne(data);
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllStatus = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.StatusModal.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
const StatussFunctions = {
  CreateStatus,
  FindStatus,
  getAllStatus,
};

export default StatussFunctions;
