import db from "../schema/db.js";
import rolesFunctions from "./Roles.js";
import StatussFunctions from "./Status.js";

// save
export const CreateOrganizationUsers = (data) => {
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
export const getAllOrganizationUsers = () => {
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
      const docs = db.OrganizationUsersModel.find(data)
        .populate({
          path: "role_id",
          model: db.RolesModal,
          select: "role_name ",
        })
        .populate({
          path: "org_id",
          model: db.OrganizationModel,
          select: "name ",
        })
        .populate({
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

export const CreateOrganizationAdmin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the guest role
      let role = await rolesFunctions.FindRole({ role_name: "Org Admin" });
      let activeStatus = await StatussFunctions.FindStatus({
        status_name: "Active",
      });
      let admin = await CreateOrganizationUsers({
        ...data,
        role_id: role._id,
        status_id: activeStatus,
      });
      resolve(admin);
    } catch (error) {
      reject(error);
    }
  });
};

const OrganizationUsersFunctions = {
  CreateOrganizationUsers,
  getAllOrganizationUsers,
  getOrganizationUsersList,
  CreateOrganizationAdmin,
};

export default OrganizationUsersFunctions;