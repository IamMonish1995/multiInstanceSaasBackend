import express from "express";
import SizesController from "../controllers/sizesController.js";

const router = express.Router();

// Public Routes
//sizes
router.post("/savesize",SizesController.saveSize);
router.get("/getallsizes",SizesController.getAllSizes);

export default router;
