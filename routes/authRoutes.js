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

export default router;
