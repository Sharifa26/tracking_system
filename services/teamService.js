import Team from "../models/team.js";
import User from "../models/user.js";

const teamService = {};

teamService.createTeam = async (name, description, userId) => {
    const team = await Team.create({
        name,
        description,
        createdBy: userId,
        members: [userId],
    });

    return team;
};

teamService.getTeamsByUserId = async (userId) => {
    return await Team.find({ members: userId })
        .populate("members", "name email")
        .populate("createdBy", "name email");
};

teamService.getTeamById = async (teamId, userId) => {
    const team = await Team.findById(teamId)
        .populate("members", "name email")
        .populate("createdBy", "name email");

    if (!team) {
        throw new Error("Team not found");
    }

    if (!team.members.some(member => member._id.toString() === userId.toString())) {
        throw new Error("Not authorized");
    }

    return team;
};

teamService.addMembers = async (teamId, userIdToAdd, currentUserId) => {
    const team = await Team.findById(teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    if (team.createdBy.toString() !== currentUserId.toString()) {
        throw new Error("Only team owner can add members");
    }

    const userExists = await User.findById(userIdToAdd);
    if (!userExists) {
        throw new Error("User not found");
    }

    if (team.members.includes(userIdToAdd)) {
        throw new Error("User already in team");
    }

    team.members.push(userIdToAdd);
    await team.save();

    return team;
};

teamService.removeMembers = async (teamId, userIdToRemove, currentUserId) => {

    const userExists = await User.findById(userIdToRemove);
    if (!userExists) {
        throw new Error("User not found");
    }

    const team = await Team.findById(teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    if (!team.members.some(member => member._id.toString() === userIdToRemove.toString())) {
        throw new Error("User not in team");
    }

    if (team.createdBy.toString() !== currentUserId.toString()) {
        throw new Error("Only team owner can remove members");
    }

    team.members = team.members.filter(
        member => member.toString() !== userIdToRemove
    );

    await team.save();
    return team;
};

export default teamService;
