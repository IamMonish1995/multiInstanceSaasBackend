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
export const getClientUsersList = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.ClientUsersModel.find(data).populate({
        path: "role_id",
        model: db.RolesModal,
        select: "role_name ",
      }).populate({
        path: "client_id",
        model: db.ClientsModal,
        select: "client_name",
      }).populate({
        path: "status_id",
        model: db.StatusModal,
        select: "status_name",
      });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};

const ClientUsersFunctions = {
  saveClientUsersModel,
  getAllClientUsersModel,
  getClientUsersList
};

export default ClientUsersFunctions;