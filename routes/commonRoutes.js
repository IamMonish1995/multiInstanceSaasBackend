import express from "express";
import OrganizationsController from "../controllers/organizationsController.js";

const router = express.Router();

// Public Routes
router.post("/createorganization",OrganizationsController.saveOrganization);// register
router.post("/loginorganization",OrganizationsController.loginOrganization);// login

// Private Routes
// Organization
router.get("/getallorganizations",OrganizationsController.getAllOrganizations);

export default router;
