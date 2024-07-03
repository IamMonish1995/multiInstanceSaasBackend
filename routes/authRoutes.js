import express from "express";
import checkUserAuth from "../middlewares/auth-middleware.js";
import AuthController from "../controllers/authController.js";

const router = express.Router();

// Public Routes
router.post("/gettoken", AuthController.getToken); // login
router.get("/getConfig",checkUserAuth, AuthController.getToken); // login


export default router;
