import db from "../schema/db.js";
import StatussFunctions from "./Status.js";

// save
export const CreateRole = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let activeStatus = await StatussFunctions.FindStatus({
        status_name: "Active",
      });
      const doc = new db.RolesModal({ ...data, status_id: activeStatus });
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const UpdateRole = (role_id,name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.RolesModal.updateOne(
        { _id: role_id },       
        { $set: { role_name: name } } 
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
export const DeleteRole = (role_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.RolesModal.deleteOne({ _id: role_id });
      resolve(result);
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
  UpdateRole,
  DeleteRole
};

export default rolesFunctions;
