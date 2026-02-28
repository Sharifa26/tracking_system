import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import commentController from "../controllers/commentController.js";

const router = express.Router();

router.post("/:taskId", authMiddleware, commentController.addComment);
router.get("/:taskId", authMiddleware, commentController.getComments);
router.put("/:commentId", authMiddleware, commentController.editComment);
router.delete("/:commentId", authMiddleware, commentController.deleteComment);

export default router;

