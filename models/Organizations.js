import mongoose from "mongoose";

// Defining Schema
const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  organizationdomain: { type: String, trim: true },
  organizationnoofproducts: { type: String, trim: true },
  adminemail: { type: String, required: true, trim: true, unique: true },
  adminpassword: { type: String, required: true, trim: true },
  website: { type: String, trim: true },
  logo: { type: String, trim: true },
  credits: { type: Number, trim: true, default: 0 },
  activePlan: { type: String, trim: true ,default: "free"},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Model
const OrganizationModel = mongoose.model("organizations", organizationSchema);
// save
export const saveOrganizationModel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new OrganizationModel(data);
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
      const docs = OrganizationModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export default OrganizationModel;
