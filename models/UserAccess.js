import db from "../schema/db.js";

// save
export const CreateUserAccess = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new db.UserAccessModal(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};

export const FindUserAccess = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.UserAccessModal.findOne(data);
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const FindUserAccessList = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.UserAccessModal.find(data).populate({
        path: "role_id",
        model: db.RolesModal,
        select: "role_name ",
      }).populate({
        path: "menu_id",
        model: db.MenusModal,
        select: "menu_name ",
      });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllUserAccess = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.UserAccessModal.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};


const UserAccessFunctions = {
  CreateUserAccess,
  getAllUserAccess,
  FindUserAccess,
  FindUserAccessList
};

export default UserAccessFunctions;
