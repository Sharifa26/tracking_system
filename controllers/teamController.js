import teamService from "../services/teamService.js";

const teamController = {};

teamController.createTeam = async (req, res) => {
    try {
        const { name, description } = req.body;

        const team = await teamService.createTeam(
            name,
            description,
            req.user._id
        );

        res.status(201).json({
            message: "Team created successfully",
            team,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

teamController.getMyTeambyUserId = async (req, res) => {
    try {
        const teams = await teamService.getTeamsByUserId(req.user._id);
        res.status(200).json({
            message: "Teams fetched successfully",
            teams,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

teamController.getTeamById = async (req, res) => {
    try {
        const team = await teamService.getTeamById(
            req.params.teamId,
            req.user._id
        );

        res.status(200).json({
            message: "Team fetched successfully",
            team,
        });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

teamController.addMember = async (req, res) => {
    try {
        const { userId } = req.body;

        const team = await teamService.addMembers(
            req.params.teamId,
            userId,
            req.user._id
        );

        res.status(201).json({
            message: "Member added successfully",
            team
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

teamController.removeMember = async (req, res) => {
    try {
        const team = await teamService.removeMembers(
            req.params.teamId,
            req.params.userId,
            req.user._id
        );

        res.status(200).json({
            message: "Member removed successfully",
            team,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default teamController;
