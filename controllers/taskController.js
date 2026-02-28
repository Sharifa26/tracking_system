import task from "../models/task.js";
import taskService from "../services/taskService.js";

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body, req.user._id);

        res.status(201).json({
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

taskController.getAllTask = async (req, res) => {
    try {
        const task = await taskService.getAllTasks(req.query);
        res.status(200).json({
            message: "Task fetched successfully",
            totalCount: task.length,
            task,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

taskController.getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.taskId);
        res.status(200).json({
            message: "Task fetched successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

taskController.getMyTasks = async (req, res) => {
    try {
        const id = req.user._id;
        const tasks = await taskService.getTasksByUserId(id);
        res.status(200).json({
            message: "Tasks fetched successfully",
            totalCount: tasks.length,
            tasks,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

taskController.updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(
            req.params.taskId,
            req.body,
            req.user._id
        );

        res.status(200).json({
            message: "Task updated successfully"
        });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.taskId, req.user._id);

        res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

export default taskController;