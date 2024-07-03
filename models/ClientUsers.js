import db from "../schema/db.js";

// save
export const saveClientUsersModel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new db.ClientUsersModel(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllClientUsersModel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.ClientUsersModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
