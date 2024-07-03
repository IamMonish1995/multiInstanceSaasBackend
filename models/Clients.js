import db from "../schema/db.js";

// save
export const saveClientsModal = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new db.ClientsModal(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllClientsModal = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.ClientsModal.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
