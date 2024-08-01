import express from "express";
import checkUserAuth from "../middlewares/auth-middleware.js";
import OrganizationsController from "../controllers/organizationsController.js";

const router = express.Router();

// Public Routes
router.post("/createorg",checkUserAuth, OrganizationsController.saveOrganization); // initial setup

export default router;
