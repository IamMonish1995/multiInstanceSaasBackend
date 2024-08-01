import express from "express";
import DevController from "../controllers/devController.js";

const router = express.Router();

// Public Routes
router.get("/initialdata", DevController.InitiatSetupWizard); // initial setup
router.post("/encryptdata", DevController.Encryptdata); // user
router.post("/decryptdata", DevController.Decryptdata); // get profile config

export default router;
