import express from "express";
import OrganizationsController from "../controllers/organizationsController.js";

const router = express.Router();

// Public Routes
//organization
router.post("/saveorganizations ",OrganizationsController.saveOrganization);
router.get("/getallorganizations",OrganizationsController.getAllOrganizations);

export default router;
