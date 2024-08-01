import express from "express";
import checkUserAuth from "../middlewares/auth-middleware.js";
import ClientsController from "../controllers/clientsController.js";

const router = express.Router();

// Public Routes
router.post("/createclient",checkUserAuth, ClientsController.saveClients); // initial setup

export default router;
