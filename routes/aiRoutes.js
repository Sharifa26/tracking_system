import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import aiController from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate-description", authMiddleware, aiController.generateTaskDescription);

export default router;