import db from "../schema/db.js";
import StatussFunctions from "./Status.js";

// save
export const CreateClient = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let activeStatus = await StatussFunctions.FindStatus({
        status_name: "Active",
      });
      const doc = new db.ClientsModal({
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
export const getAllClients = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.ClientsModal.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getClients = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.ClientsModal.find(data);
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};

const ClientsFunctions = {
  CreateClient,
  getAllClients,
  getClients
};

export default ClientsFunctions;
