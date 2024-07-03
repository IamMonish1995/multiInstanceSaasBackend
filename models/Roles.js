import db from "../schema/db.js";

// save
export const CreateRole = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new db.RolesModal(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const FindRole = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.RolesModal.findOne(data);
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllRoles = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.RolesModal.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
const rolesFunctions = {
  CreateRole,
  FindRole,
  getAllRoles,
};

export default rolesFunctions;
