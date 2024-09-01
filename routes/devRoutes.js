import express from "express";
import DevController from "../controllers/devController.js";

const router = express.Router();

// Public Routes
router.get("/initialdata", DevController.InitiatSetupWizard); // initial setup
router.post("/encryptdata", DevController.Encryptdata); // user
router.post("/decryptdata", DevController.Decryptdata); // get profile config

router.get("/createInstanceEnviroment", DevController.createInstanceEnviromentInAWS); // 
router.get("/getec2instancedetals", DevController.createInstanceEnviromentInAWS); // 

export default router;
