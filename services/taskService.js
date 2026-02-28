import Task from "../models/task.js";
import Team from "../models/team.js";
import Notification from "../models/Notification.js";

const taskService = {};

taskService.createTask = async (data, userId) => {
    const { title, description, teamId, assignedTo, priority, dueDate } = data;

    let team = null;

    // If teamId provided → validate
    if (teamId) {
        team = await Team.findById(teamId);
        if (!team) throw new Error("Team not found");

        if (!team.members.includes(userId)) {
            throw new Error("You are not a member of this team");
        }

        if (assignedTo && !team.members.includes(assignedTo)) {
            throw new Error("Assigned user not in team");
        }
    }

    const allowedPriority = ["low", "medium", "high"];

    if (priority && !allowedPriority.includes(priority)) {
        throw new Error("Invalid priority value");
    }

    const task = await Task.create({
        title,
        description,
        teamId: teamId || null,
        assignedTo,
        priority,
        dueDate,
        createdBy: userId,
    });

    if (assignedTo) {
        await Notification.create({
            userId: assignedTo,
            taskId: task._id,
            type: "task_assigned",
            message: `You have been assigned a task: ${title}`,
        });
    }

    return task;
};

taskService.getAllTasks = async (query) => {
    const { status, priority, teamId, search } = query;

    let filter = {};

    if (status) {
        filter.status = status;
    }

    if (priority) {
        filter.priority = priority;
    }

    if (teamId) {
        filter.teamId = teamId;
    }

    if (search) {
        filter.title = { $regex: search, $options: "i" };
    }

    return await Task.find(filter)
        .populate("assignedTo", "name email")
        .populate("teamId", "name")
        .sort({ createdAt: -1 });
};

taskService.getTaskById = async (taskId) => {
    return await Task.findById(taskId)
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email")
        .populate("teamId", "name");
};

taskService.getTasksByUserId = async (userId) => {
    return await Task.find({ assignedTo: userId })
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email")
        .populate("teamId", "name");
};

taskService.updateTask = async (taskId, data, userId) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    if (
        task.createdBy.toString() !== userId.toString() &&
        task.assignedTo?.toString() !== userId.toString()
    ) {
        throw new Error("Not authorized to update this task");
    }

    const allowedStatus = ["open", "completed"];
    const allowedPriority = ["low", "medium", "high"];

    if (data.status && !allowedStatus.includes(data.status)) {
        throw new Error("Invalid status value");
    }

    if (data.priority && !allowedPriority.includes(data.priority)) {
        throw new Error("Invalid priority value");
    }

    Object.assign(task, data);
    await task.save();

    return task;
};

taskService.deleteTask = async (taskId, userId) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    if (task.createdBy.toString() !== userId.toString()) {
        throw new Error("Only creator can delete task");
    }

    await task.deleteOne();
};

export default taskService;