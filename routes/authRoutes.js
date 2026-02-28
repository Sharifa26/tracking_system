import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/users", authMiddleware, authController.getAllUsers);
router.get("/profile", authMiddleware, authController.getUserById);
router.put("/profile", authMiddleware, authController.updateUser);

export default router;
