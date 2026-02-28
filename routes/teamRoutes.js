import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import teamController from "../controllers/teamController.js";

const router = express.Router();

router.post("/", authMiddleware, teamController.createTeam);
router.get("/", authMiddleware, teamController.getMyTeambyUserId);
router.get("/:teamId", authMiddleware, teamController.getTeamById);
router.post("/:teamId/members", authMiddleware, teamController.addMember);
router.delete("/:teamId/members/:userId", authMiddleware, teamController.removeMember);

export default router;