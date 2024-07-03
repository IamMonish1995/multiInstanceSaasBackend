import db from "../schema/db.js";
import rolesFunctions from "./Roles.js";
import StatussFunctions from "./Status.js";

// save
export const CreateSystemUsers = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let activeStatus = await StatussFunctions.FindStatus({
        status_name: "Active",
      });
      const doc = new db.SystemUsersModel({ ...data, status_id: activeStatus });
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllSystemUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.SystemUsersModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};

export const CreateSystemAdmin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the guest role
      let role = await rolesFunctions.FindRole({ role_name: "System Admin" });
      let admin = await CreateSystemUsers({ ...data, role_id: role._id });
      resolve(admin);
    } catch (error) {
      reject(error);
    }
  });
};
export const CreateSystemGuest = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the guest role
      let role = await rolesFunctions.FindRole({ role_name: "System Guest" });
      let guest = await CreateSystemUsers({ ...data, role_id: role._id });
      resolve(guest);
    } catch (error) {
      reject(error);
    }
  });
};
export const CreateSystemUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Find the guest role
      let role = await rolesFunctions.FindRole({ role_name: "System User" });
      let User = await CreateSystemUsers({ ...data, role_id: role._id });
      resolve(User);
    } catch (error) {
      reject(error);
    }
  });
};

const SystemUsersFunctions = {
  CreateSystemUsers,
  getAllSystemUsers,
  CreateSystemAdmin,
  CreateSystemGuest,
  CreateSystemUser,
};

export default SystemUsersFunctions;
