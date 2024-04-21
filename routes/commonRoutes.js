import express from "express";
import OrganizationsController from "../controllers/organizationsController.js";
import InstancesController from "../controllers/instancesController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
import ProjectsController from "../controllers/projectssController.js";

const router = express.Router();

// Public Routes
router.post("/createorganization", OrganizationsController.saveOrganization); // register
router.post("/loginorganization", OrganizationsController.loginOrganization); // login

// Private Routes
// Organization
router.get(
  "/getallorganizations",
  checkUserAuth,
  OrganizationsController.getAllOrganizations
);
// projects
router.post("/createproject", checkUserAuth, ProjectsController.saveProject);
router.get("/getallprojects", checkUserAuth, ProjectsController.getAllProjects);
router.get(
  "/getprojecsbyorgid",
  checkUserAuth,
  ProjectsController.getAllProjectsByOrgId
);
// instances
router.post("/createinstance", checkUserAuth, InstancesController.saveInstance);
router.get(
  "/getallinstances",
  checkUserAuth,
  InstancesController.getAllInstances
);
router.get(
  "/getinstancesbyprojectid",
  checkUserAuth,
  InstancesController.getAllInstancesByProjectId
);

export default router;
