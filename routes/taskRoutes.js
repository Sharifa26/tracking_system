import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import taskController from "../controllers/taskController.js";

const router = express.Router();

router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getAllTask);
router.get("/mytask", authMiddleware, taskController.getMyTasks);
router.get("/:taskId", authMiddleware, taskController.getTaskById);
router.put("/:taskId", authMiddleware, taskController.updateTask);
router.delete("/:taskId", authMiddleware, taskController.deleteTask);

export default router;