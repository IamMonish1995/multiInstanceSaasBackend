import db from "../schema/db.js";

// save
export const saveOrganizationUsersModel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new db.OrganizationUsersModel(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllOrganizationUsersModel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.OrganizationUsersModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getOrganizationUsersList = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.OrganizationUsersModel.find(data).populate({
        path: "role_id",
        model: db.RolesModal,
        select: "role_name ",
      }).populate({
        path: "org_id",
        model: db.OrganizationModel,
        select: "name ",
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

const OrganizationUsersFunctions = {
  saveOrganizationUsersModel,
  getAllOrganizationUsersModel,
  getOrganizationUsersList
};

export default OrganizationUsersFunctions;