import db from "../schema/db.js";
import StatussFunctions from "./Status.js";

// save
export const saveOrganization = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let activeStatus = await StatussFunctions.FindStatus({
        status_name: "Active",
      });
      const doc = new db.OrganizationModel({
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

export const getAllOrganization = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.OrganizationModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getOrganization = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.OrganizationModel.find(data);
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};

const OrganizationFunctions = {
  saveOrganization,
  getAllOrganization,
  getOrganization
};

export default OrganizationFunctions;
