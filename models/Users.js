import db from "../schema/db.js";
// save
export const CreateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new db.UsersModal(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.UsersModal.find({});
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
