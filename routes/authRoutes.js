import express from "express";
import checkUserAuth from "../middlewares/auth-middleware.js";
import AuthController from "../controllers/authController.js";

const router = express.Router();

// Public Routes
router.get("/initialdata", AuthController.InitiatSetupWizard); // initial setup
router.post("/getProfiles", AuthController.getUser); // user
router.post(
  "/getProfileConfig",
  checkUserAuth,
  AuthController.getProfileConfig
); // get profile config

router.get(
  "/getAllMenus",
  AuthController.getAllMenus
); // get profile config
router.get(
  "/getAllRoles",
  AuthController.getAllRoles
); // get profile config

router.post(
  "/saveNewRole",
  checkUserAuth,
  AuthController.saveNewRole
); // create role

router.post(
  "/updateRole",
  checkUserAuth,
  AuthController.updateRole
); // create role
router.post(
  "/deleteRole",
  checkUserAuth,
  AuthController.deleteRole
); // create role




export default router;
