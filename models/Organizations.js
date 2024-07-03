import db from "../schema/db.js";

// save
export const saveOrganizationModel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new db.OrganizationModel(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};


export const getAllOrganizationModel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.OrganizationModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
