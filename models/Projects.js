import db from "../schema/db.js";

// save
export const deleteProjectsModel = ({ projectID }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const delete_instance = await db.InstancesModel.deleteMany({
        projectid: projectID,
      })
        .then(async (res) => {
          const delete_document = await db.ProjectsModel.deleteOne({
            _id: projectID,
          });
          resolve(delete_document);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const saveProjectsModel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new db.ProjectsModel(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllProjectsModel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.ProjectsModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllProjectsByOrgIdModal = (orgid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.ProjectsModel.find({ orgid });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getProjectModelById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = db.ProjectsModel.findOne({ _id: id });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export default db.ProjectsModel;
