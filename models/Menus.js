import db from "../schema/db.js";

// save
export const CreateMenu = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new db.MenusModal(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const FindMenu = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.MenusModal.findOne(data);
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllMenus = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.MenusModal.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
const MenusFunctions = {
  CreateMenu,
  FindMenu,
  getAllMenus,
};

export default MenusFunctions;
