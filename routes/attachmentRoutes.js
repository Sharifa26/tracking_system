import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import attachmentController from "../controllers/attachmentController.js";

const router = express.Router();

router.post("/:taskId", authMiddleware, upload.single("file"), attachmentController.addfile);
router.get("/:taskId", authMiddleware, attachmentController.getFiles);
router.delete("/:attachmentId", authMiddleware, attachmentController.deleteFile);

export default router;
