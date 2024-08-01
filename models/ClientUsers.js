import db from "../schema/db.js";
import rolesFunctions from "./Roles.js";
import StatussFunctions from "./Status.js";

// save
export const CreateClientUsers = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let activeStatus = await StatussFunctions.FindStatus({
        status_name: "Active",
      });
      const doc = new db.ClientUsersModel({
        ...data,
        status_id: activeStatus,
      });
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const CreateClientAdmin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let role = await rolesFunctions.FindRole({ role_name: "Client Admin" });
      const saved_document = await CreateClientUsers({
        ...data,
        role_id: role._id,
      });
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllClientUsers = () => {
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
      const docs = db.ClientUsersModel.find(data)
        .populate({
          path: "role_id",
          model: db.RolesModal,
          select: "role_name ",
        })
        .populate({
          path: "client_id",
          model: db.ClientsModal,
          select: "client_name",
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

const ClientUsersFunctions = {
  CreateClientUsers,
  getAllClientUsers,
  getClientUsersList,
  CreateClientAdmin
};

export default ClientUsersFunctions;